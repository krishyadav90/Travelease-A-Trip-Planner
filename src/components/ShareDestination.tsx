
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Heart, Copy, Facebook, Twitter, Download } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface ShareDestinationProps {
  destinationName: string;
  destinationId?: string;
  url?: string;
}

const ShareDestination = ({ destinationName, destinationId, url }: ShareDestinationProps) => {
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const currentUrl = url || window.location.href;

  const handleSaveToWishlist = async () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save destinations",
        variant: "destructive",
      });
      return;
    }

    setSaving(true);
    try {
      // For demo purposes, we'll simulate saving to wishlist
      setIsSaved(true);
      toast({
        title: "Saved to wishlist!",
        description: `${destinationName} has been added to your wishlist`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to save to wishlist",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Link copied!",
        description: "Destination link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };

  const shareOnFacebook = () => {
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(`Check out ${destinationName}!`)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const shareText = `Check out ${destinationName}! ${currentUrl}`;
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const downloadInfo = () => {
    const content = `
${destinationName} - Travel Destination

Visit: ${currentUrl}

Downloaded from TravelEase
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${destinationName.replace(/\s+/g, '-')}-info.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Downloaded!",
      description: "Destination info downloaded successfully",
    });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isSaved ? "default" : "outline"}
        size="sm"
        onClick={handleSaveToWishlist}
        disabled={saving}
        className="flex items-center gap-2"
      >
        <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
        {saving ? "Saving..." : isSaved ? "Saved" : "Save"}
      </Button>

      <Dialog open={shareModalOpen} onOpenChange={setShareModalOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share {destinationName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Destination URL</Label>
              <div className="flex gap-2">
                <Input value={currentUrl} readOnly />
                <Button onClick={copyToClipboard} size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Share on Social Media</Label>
              <div className="flex gap-2">
                <Button onClick={shareOnFacebook} variant="outline" size="sm">
                  <Facebook className="h-4 w-4 mr-2" />
                  Facebook
                </Button>
                <Button onClick={shareOnTwitter} variant="outline" size="sm">
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </div>

            <Button onClick={downloadInfo} variant="outline" className="w-full">
              <Download className="h-4 w-4 mr-2" />
              Download Info
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShareDestination;
