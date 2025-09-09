import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Users, Tag, Award, CheckCircle, MessageCircle } from "lucide-react";

interface Event {
  id: number;
  title: string;
  description: string;
  college: string;
  date: string;
  location: string;
  participants: string;
  image: string;
  tags: string[];
  status: string;
  startTime: string;
  requirements: string;
  prizes: string;
}

interface EventDetailModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

const EventDetailModal = ({ event, isOpen, onClose }: EventDetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Banner Image */}
        <div className="w-full h-64 bg-gradient-primary rounded-lg mb-6 flex items-center justify-center">
          <div className="text-white text-center">
            <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
            <p className="text-white/90">Event Banner Image</p>
          </div>
        </div>

        {/* Event Header */}
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-bold mb-2">{event.title}</DialogTitle>
          <p className="text-lg text-muted-foreground mb-4">{event.college}</p>
        </DialogHeader>

        {/* Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Event Details</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          {/* Event Details Tab */}
          <TabsContent value="details" className="space-y-6">
            {/* Key Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Start Time</p>
                  <p className="text-sm text-muted-foreground">{event.startTime}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{event.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Participants</p>
                  <p className="text-sm text-muted-foreground">{event.participants}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">About This Event</h3>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </div>

            {/* Tags */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Tag className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant={tag === "completed" ? "secondary" : "default"}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <CheckCircle className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Requirements</h3>
              </div>
              <p className="text-muted-foreground">{event.requirements}</p>
            </div>

            {/* Prizes */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold">Prizes</h3>
              </div>
              <p className="text-muted-foreground">{event.prizes}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="hero" size="lg" className="flex-1">
                Register for Event
              </Button>
              <Button variant="outline" size="lg">
                Add to Calendar
              </Button>
              <Button variant="outline" size="lg">
                Share Event
              </Button>
            </div>
          </TabsContent>

          {/* Comments Tab */}
          <TabsContent value="comments" className="space-y-6">
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Comments & Discussions</h3>
              <p className="text-muted-foreground mb-6">
                Connect with other participants and organizers
              </p>
              <Button variant="gradient">Join the Discussion</Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailModal;