
import { supabase } from "@/integrations/supabase/client";

// Uploads file to avatars bucket and returns public URL
export const uploadProfileAvatar = async (userId: string, file: File) => {
  try {
    // Validate file
    if (!file.type.startsWith('image/')) {
      throw new Error('Please upload an image file');
    }
    
    if (file.size > 2 * 1024 * 1024) { // 2MB limit
      throw new Error('File size must be less than 2MB');
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/avatar.${fileExt}`;
    
    console.log('Uploading file with path:', fileName);
    
    // Upload file to storage with proper path structure
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: true
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      throw new Error(`Upload failed: ${uploadError.message}`);
    }

    console.log('Upload successful:', uploadData);

    // Get public URL
    const { data } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);
    
    console.log('Public URL generated:', data?.publicUrl);
    
    return data?.publicUrl || null;
  } catch (error) {
    console.error('Avatar upload error:', error);
    throw error;
  }
};
