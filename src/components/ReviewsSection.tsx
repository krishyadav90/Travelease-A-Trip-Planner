import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, ThumbsUp, MessageSquare, Plus, Check, X, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  user_id: string;
  rating: number;
  title: string;
  content: string;
  pros: string[];
  cons: string[];
  visit_date: string;
  helpful_count: number;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url: string;
  } | null;
}

interface ReviewsSectionProps {
  destinationId?: string;
  attractionId?: string;
}

const ReviewsSection = ({ destinationId, attractionId }: ReviewsSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    content: "",
    pros: [""],
    cons: [""],
    visit_date: ""
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (destinationId || attractionId) {
      fetchReviews();
    } else {
      setLoading(false);
    }
  }, [destinationId, attractionId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('reviews')
        .select('*, profiles(full_name, avatar_url)')
        .order('created_at', { ascending: false });

      if (destinationId) {
        query = query.eq('destination_id', destinationId);
      } else if (attractionId) {
        query = query.eq('attraction_id', attractionId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching reviews:', error);
        toast({
          title: "Error loading reviews",
          description: error.message,
          variant: "destructive",
        });
        setReviews([]);
      } else {
        setReviews(data as Review[]);
      }
    } catch (error: any) {
      console.error('Error fetching reviews:', error);
      toast({
        title: "Error loading reviews",
        description: "Unable to load reviews at this time.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to write a review.",
        variant: "destructive",
      });
      return;
    }

    if (!newReview.title.trim() || !newReview.content.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in title and content for your review.",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);
    try {
      const reviewToInsert = {
        user_id: user.id,
        destination_id: destinationId || null,
        attraction_id: attractionId || null,
        rating: newReview.rating,
        title: newReview.title.trim(),
        content: newReview.content.trim(),
        pros: newReview.pros.filter(p => p.trim()),
        cons: newReview.cons.filter(c => c.trim()),
        visit_date: newReview.visit_date || null,
        is_approved: true, // Auto-approve new reviews for now
      };
      
      const { error } = await supabase.from('reviews').insert(reviewToInsert);

      if (error) throw error;

      toast({
        title: "Review submitted!",
        description: "Your review has been added successfully.",
      });

      setShowWriteReview(false);
      setNewReview({
        rating: 5,
        title: "",
        content: "",
        pros: [""],
        cons: [""],
        visit_date: ""
      });
      fetchReviews(); // Re-fetch reviews to show the new one
    } catch (error: any) {
      console.error('Error submitting review:', error);
      toast({
        title: "Error submitting review",
        description: "Unable to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      const { error } = await supabase.from('reviews').delete().eq('id', reviewId);
      if (error) throw error;
      
      setReviews(prev => prev.filter(review => review.id !== reviewId));
      toast({
        title: "Review deleted",
        description: "Your review has been removed successfully.",
      });
    } catch (error: any) {
      console.error('Error deleting review:', error);
      toast({
        title: "Error deleting review",
        description: "Unable to delete review. Please try again.",
        variant: "destructive",
      });
    }
  };

  const updatePros = (index: number, value: string) => {
    const newPros = [...newReview.pros];
    newPros[index] = value;
    setNewReview({ ...newReview, pros: newPros });
  };

  const updateCons = (index: number, value: string) => {
    const newCons = [...newReview.cons];
    newCons[index] = value;
    setNewReview({ ...newReview, cons: newCons });
  };

  const addPro = () => {
    setNewReview({ ...newReview, pros: [...newReview.pros, ""] });
  };

  const addCon = () => {
    setNewReview({ ...newReview, cons: [...newReview.cons, ""] });
  };

  const removePro = (index: number) => {
    const newPros = newReview.pros.filter((_, i) => i !== index);
    setNewReview({ ...newReview, pros: newPros });
  };

  const removeCon = (index: number) => {
    const newCons = newReview.cons.filter((_, i) => i !== index);
    setNewReview({ ...newReview, cons: newCons });
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'fill-yellow-400 text-yellow-400' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRatingChange?.(star)}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Reviews ({reviews.length})
            </CardTitle>
            <Button onClick={() => setShowWriteReview(!showWriteReview)}>
              <Plus className="h-4 w-4 mr-2" />
              Write Review
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Write Review Form */}
      {showWriteReview && (
        <Card>
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Review title"
                value={newReview.title}
                onChange={(e) => setNewReview({...newReview, title: e.target.value})}
              />
              <Input
                type="date"
                placeholder="Visit date"
                value={newReview.visit_date}
                onChange={(e) => setNewReview({...newReview, visit_date: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              {renderStars(newReview.rating, true, (rating) => setNewReview({...newReview, rating}))}
            </div>

            <Textarea
              placeholder="Share your experience..."
              value={newReview.content}
              onChange={(e) => setNewReview({...newReview, content: e.target.value})}
              rows={4}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Pros</label>
                {newReview.pros.map((pro, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      placeholder="What did you like?"
                      value={pro}
                      onChange={(e) => updatePros(index, e.target.value)}
                    />
                    {newReview.pros.length > 1 && (
                      <Button size="sm" variant="outline" onClick={() => removePro(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button size="sm" variant="outline" onClick={addPro}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Pro
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Cons</label>
                {newReview.cons.map((con, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      placeholder="What could be improved?"
                      value={con}
                      onChange={(e) => updateCons(index, e.target.value)}
                    />
                    {newReview.cons.length > 1 && (
                      <Button size="sm" variant="outline" onClick={() => removeCon(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button size="sm" variant="outline" onClick={addCon}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Con
                </Button>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={submitReview} disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Review"}
              </Button>
              <Button variant="outline" onClick={() => setShowWriteReview(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="hover-glow-border-card">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.profiles?.avatar_url} />
                  <AvatarFallback>
                    {review.profiles?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{review.title}</h4>
                      <p className="text-sm text-gray-600">
                        by {review.profiles?.full_name || 'Anonymous'} • {' '}
                        {new Date(review.created_at).toLocaleDateString()}
                        {review.visit_date && (
                          <span> • Visited {new Date(review.visit_date).toLocaleDateString()}</span>
                        )}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating)}
                      {user && user.id === review.user_id && (
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => deleteReview(review.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{review.content}</p>
                  
                  {(review.pros.length > 0 || review.cons.length > 0) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      {review.pros.length > 0 && (
                        <div>
                          <h5 className="font-medium text-green-700 mb-2 flex items-center gap-1">
                            <Check className="h-4 w-4" />
                            Pros
                          </h5>
                          <ul className="space-y-1">
                            {review.pros.map((pro, index) => (
                              <li key={index} className="text-sm text-gray-600">• {pro}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {review.cons.length > 0 && (
                        <div>
                          <h5 className="font-medium text-red-700 mb-2 flex items-center gap-1">
                            <X className="h-4 w-4" />
                            Cons
                          </h5>
                          <ul className="space-y-1">
                            {review.cons.map((con, index) => (
                              <li key={index} className="text-sm text-gray-600">• {con}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      Helpful ({review.helpful_count})
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {reviews.length === 0 && !loading && (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
              <p className="text-gray-600 mb-4">Be the first to share your experience!</p>
              <Button onClick={() => setShowWriteReview(true)}>
                Write the first review
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ReviewsSection;
