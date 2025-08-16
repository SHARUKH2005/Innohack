"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Users, Search, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";

export default function CommunityPage() {
  // State for discussions data
  const [discussionData, setDiscussionData] = useState(discussions);
  
  // State to track which discussions have their comments expanded
  const [expandedDiscussions, setExpandedDiscussions] = useState<Record<string, boolean>>({});
  
  // State for new comments
  const [newComments, setNewComments] = useState<Record<string, string>>({});
  
  // Toggle comments visibility for a discussion
  const toggleDiscussionComments = (discussionId: string) => {
    setExpandedDiscussions(prev => ({
      ...prev,
      [discussionId]: !prev[discussionId]
    }));
  };
  
  // Handle new comment input change
  const handleCommentChange = (discussionId: string, value: string) => {
    setNewComments(prev => ({
      ...prev,
      [discussionId]: value
    }));
  };
  
  // Add a new comment to a discussion
  const addComment = (discussionId: string) => {
    const commentText = newComments[discussionId];
    if (!commentText?.trim()) return;
    
    setDiscussionData(prevData => {
      return prevData.map(discussion => {
        if (discussion.id === discussionId) {
          const newComment = {
            id: `${discussionId}-${(discussion.comments?.length || 0) + 1}`,
            author: "You",
            date: "Just now",
            content: commentText.trim(),
            avatar: "Y"
          };
          
          return {
            ...discussion,
            comments: [...(discussion.comments || []), newComment]
          };
        }
        return discussion;
      });
    });
    
    // Clear the input
    setNewComments(prev => ({
      ...prev,
      [discussionId]: ""
    }));
  };
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Community</h1>
      
      <Tabs defaultValue="discussions" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="discussions" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" />
            Discussions
          </TabsTrigger>
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Members
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="discussions">
          <div className="mb-8">
            <div className="flex gap-4 mb-6">
              <Input placeholder="Search discussions..." className="flex-1" />
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
              <Button variant="default">New Topic</Button>
            </div>
            
            <div className="space-y-4">
              {discussionData.map((discussion) => (
                <Card key={discussion.id} className="p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {discussion.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{discussion.title}</h3>
                      <p className="text-muted-foreground text-sm mb-3">{discussion.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">Posted by {discussion.author}</span>
                          <span className="text-muted-foreground">{discussion.date}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="flex items-center gap-2 hover:bg-muted"
                          onClick={() => toggleDiscussionComments(discussion.id)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          <span>{discussion.comments?.length || 0} replies</span>
                          {expandedDiscussions[discussion.id] ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                      
                      {/* Comments Section - Togglable */}
                      {expandedDiscussions[discussion.id] && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <div className="space-y-4">
                            {discussion.comments?.map((comment) => (
                              <div key={comment.id} className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                                  {comment.avatar}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="font-medium text-sm">{comment.author}</span>
                                    <span className="text-xs text-muted-foreground">{comment.date}</span>
                                  </div>
                                  <p className="text-sm">{comment.content}</p>
                                </div>
                              </div>
                            ))}
                            
                            {/* Add comment input */}
                            <div className="flex gap-3 mt-4">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                                Y
                              </div>
                              <div className="flex-1">
                                <Input 
                                  placeholder="Write a comment..." 
                                  className="text-sm"
                                  value={newComments[discussion.id] || ""}
                                  onChange={(e) => handleCommentChange(discussion.id, e.target.value)}
                                  onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                      e.preventDefault();
                                      addComment(discussion.id);
                                    }
                                  }}
                                />
                                <div className="flex justify-end mt-2">
                                  <Button 
                                    size="sm"
                                    onClick={() => addComment(discussion.id)}
                                    disabled={!newComments[discussion.id]?.trim()}
                                  >
                                    Post
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="members">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <Card key={member.id} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <p>Member since {member.joined}</p>
                  <p>Courses: {member.courses}</p>
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">View Profile</Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Mock data
const discussions = [
  {
    id: "1",
    title: "How to optimize React performance?",
    excerpt: "I have been working on a complex React application and noticed some performance issues. What are the best practices for optimizing React performance?",
    author: "Alex Chen",
    date: "2 days ago",
    comments: [
      {
        id: "1-1",
        author: "Michael Wong",
        date: "2 days ago",
        content: "I recommend looking into React.memo for preventing unnecessary re-renders of components. Also, make sure you're not creating new functions in your render method that could cause child components to re-render.",
        avatar: "M"
      },
      {
        id: "1-2",
        author: "Sarah Johnson",
        date: "1 day ago",
        content: "Have you checked out the React Profiler in DevTools? It's really helpful for identifying which components are rendering unnecessarily and taking too long.",
        avatar: "S"
      },
      {
        id: "1-3",
        author: "James Wilson",
        date: "1 day ago",
        content: "Consider using lazy loading and code splitting to reduce your initial bundle size. It made a huge difference in our application's load time.",
        avatar: "J"
      }
    ]
  },
  {
    id: "2",
    title: "Feedback on my UI/UX project",
    excerpt: "Just completed the UI/UX course final project. Would love some constructive feedback on my design approach.",
    author: "Sarah Johnson",
    date: "1 week ago",
    comments: [
      {
        id: "2-1",
        author: "Olivia Taylor",
        date: "6 days ago",
        content: "I really like your color palette choices! The contrast is excellent for accessibility. One suggestion would be to consider the spacing between elements a bit more carefully.",
        avatar: "O"
      },
      {
        id: "2-2",
        author: "Alex Chen",
        date: "5 days ago",
        content: "The mobile responsiveness looks good, but I noticed some overlapping elements at certain breakpoints. Maybe add a few more media queries?",
        avatar: "A"
      },
      {
        id: "2-3",
        author: "Emma Garcia",
        date: "3 days ago",
        content: "From a marketing perspective, I think your call-to-action buttons could be more prominent. They're getting lost in the overall design.",
        avatar: "E"
      }
    ]
  },
  {
    id: "3",
    title: "Node.js deployment best practices",
    excerpt: "What are your recommendations for deploying Node.js applications to production? Looking for security and performance tips.",
    author: "Michael Wong",
    date: "3 days ago",
    comments: [
      {
        id: "3-1",
        author: "Alex Chen",
        date: "2 days ago",
        content: "Always use environment variables for configuration and secrets. Never commit sensitive data to your repository. Tools like dotenv can help manage this.",
        avatar: "A"
      },
      {
        id: "3-2",
        author: "James Wilson",
        date: "1 day ago",
        content: "Consider using a process manager like PM2 to handle restarts and crashes. It also provides useful monitoring capabilities.",
        avatar: "J"
      }
    ]
  },
  {
    id: "4",
    title: "Career transition to web development",
    excerpt: "I am currently transitioning from marketing to web development. Any advice on building a portfolio that stands out?",
    author: "Emma Garcia",
    date: "Yesterday",
    comments: [
      {
        id: "4-1",
        author: "Olivia Taylor",
        date: "23 hours ago",
        content: "Focus on solving real problems. Even if they're small, having projects that address actual needs will make your portfolio more meaningful than just tutorial projects.",
        avatar: "O"
      },
      {
        id: "4-2",
        author: "Sarah Johnson",
        date: "22 hours ago",
        content: "Your marketing background is a strength! Consider creating projects that showcase the intersection of marketing and development, like landing pages with A/B testing components.",
        avatar: "S"
      },
      {
        id: "4-3",
        author: "Michael Wong",
        date: "10 hours ago",
        content: "Document your journey. Write about what you're learning and the challenges you're facing. It shows your thought process and growth mindset.",
        avatar: "M"
      },
      {
        id: "4-4",
        author: "Alex Chen",
        date: "5 hours ago",
        content: "Don't be afraid to contribute to open source. Even small contributions show you can work with existing codebases and collaborate with others.",
        avatar: "A"
      }
    ]
  },
];

const members = [
  {
    id: "1",
    name: "Alex Chen",
    role: "Full-Stack Developer",
    joined: "Jan 2023",
    courses: 8,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    joined: "Mar 2023",
    courses: 5,
  },
  {
    id: "3",
    name: "Michael Wong",
    role: "Backend Developer",
    joined: "Nov 2022",
    courses: 12,
  },
  {
    id: "4",
    name: "Emma Garcia",
    role: "Marketing Specialist",
    joined: "Apr 2023",
    courses: 3,
  },
  {
    id: "5",
    name: "James Wilson",
    role: "Product Manager",
    joined: "Feb 2023",
    courses: 7,
  },
  {
    id: "6",
    name: "Olivia Taylor",
    role: "Frontend Developer",
    joined: "Dec 2022",
    courses: 9,
  },
];
