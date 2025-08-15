import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Users, Search, MessageSquare } from "lucide-react";

export default function CommunityPage() {
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
              {discussions.map((discussion) => (
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
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{discussion.replies}</span>
                        </div>
                      </div>
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
    replies: 8,
  },
  {
    id: "2",
    title: "Feedback on my UI/UX project",
    excerpt: "Just completed the UI/UX course final project. Would love some constructive feedback on my design approach.",
    author: "Sarah Johnson",
    date: "1 week ago",
    replies: 12,
  },
  {
    id: "3",
    title: "Node.js deployment best practices",
    excerpt: "What are your recommendations for deploying Node.js applications to production? Looking for security and performance tips.",
    author: "Michael Wong",
    date: "3 days ago",
    replies: 5,
  },
  {
    id: "4",
    title: "Career transition to web development",
    excerpt: "I am currently transitioning from marketing to web development. Any advice on building a portfolio that stands out?",
    author: "Emma Garcia",
    date: "Yesterday",
    replies: 15,
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
