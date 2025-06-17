import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Camera, Upload, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface PhotoGalleryProps {
  destinationId?: string;
  attractionId?: string;
}

const PhotoGallery = ({ destinationId, attractionId }: PhotoGalleryProps) => {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        // Create preview URL
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) {
      toast({
        title: "Error",
        description: "Please select a file and sign in",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    try {
      // For demo purposes, we'll simulate upload and add to local state
      const newPhoto = {
        id: Date.now().toString(),
        user_id: user.id,
        destination_id: destinationId || null,
        attraction_id: attractionId || null,
        image_url: previewUrl,
        caption: caption,
        is_approved: true,
        created_at: new Date().toISOString(),
        user_name: user.email?.split('@')[0] || 'User'
      };

      setPhotos(prev => [newPhoto, ...prev]);

      toast({
        title: "Photo uploaded!",
        description: "Your photo has been uploaded successfully",
      });

      setSelectedFile(null);
      setPreviewUrl("");
      setCaption("");
      setUploadModalOpen(false);
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Sample photos for demo
  const samplePhotos = [
    {
      id: "1",
      image_url: "/placeholder.svg",
      caption: "Beautiful sunset view",
      user_name: "Traveler",
      created_at: new Date().toISOString()
    },
    {
      id: "2", 
      image_url: "/placeholder.svg",
      caption: "Amazing architecture",
      user_name: "Explorer",
      created_at: new Date().toISOString()
    },
    {
      id: "3",
      image_url: "/placeholder.svg", 
      caption: "Local cuisine experience",
      user_name: "Foodie",
      created_at: new Date().toISOString()
    }
  ];

  const displayPhotos = photos.length > 0 ? photos : samplePhotos;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Photo Gallery ({displayPhotos.length})
          </CardTitle>
          {user && (
            <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Photo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Upload Photo</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="photo">Select Photo</Label>
                    <Input
                      id="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="cursor-pointer"
                    />
                  </div>
                  {previewUrl && (
                    <div className="relative">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <div>
                    <Label htmlFor="caption">Caption</Label>
                    <Textarea
                      id="caption"
                      placeholder="Share your experience..."
                      value={caption}
                      onChange={(e) => setCaption(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      onClick={handleUpload} 
                      disabled={!selectedFile || uploading}
                      className="flex-1"
                    >
                      {uploading ? "Uploading..." : "Upload Photo"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setUploadModalOpen(false);
                        setSelectedFile(null);
                        setPreviewUrl("");
                        setCaption("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayPhotos.map((photo) => (
              <div key={photo.id} className="relative group">
                <img
                  src={photo.image_url}
                  alt={photo.caption || "Travel photo"}
                  className="w-full h-48 object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 rounded-lg flex items-end">
                  <div className="p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {photo.caption && (
                      <p className="text-sm font-medium mb-1">{photo.caption}</p>
                    )}
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      <span className="text-xs">{photo.user_name || 'Traveler'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!user && displayPhotos.length === 0 && (
          <div className="text-center py-8">
            <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No photos yet. Sign in to be the first to share!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoGallery;
