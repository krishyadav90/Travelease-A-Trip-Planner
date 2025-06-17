
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Bell, Globe, Shield, Trash2 } from "lucide-react";

interface Props {
  profile: any;
  refreshProfile: () => void;
}

const SettingsPanel = ({ profile, refreshProfile }: Props) => {
  const [email, setEmail] = useState(profile?.email || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Email change
  const handleEmailUpdate = async () => {
    if (!email || email === profile?.email) return;
    
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ 
      email,
      data: {
        emailRedirectTo: `${window.location.origin}/`
      }
    });
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ 
        title: "Email update sent", 
        description: "Check your new email inbox to confirm the change." 
      });
    }
    setLoading(false);
  };

  // Password change
  const handlePasswordUpdate = async () => {
    if (!newPassword || newPassword !== confirmPassword) {
      toast({ 
        title: "Password Error", 
        description: "Passwords don't match or are empty", 
        variant: "destructive" 
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({ 
        title: "Password Error", 
        description: "Password must be at least 6 characters", 
        variant: "destructive" 
      });
      return;
    }
    
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Password changed", description: "Your password has been updated successfully." });
      setNewPassword("");
      setConfirmPassword("");
    }
    setLoading(false);
  };

  // Reset password
  const handlePasswordReset = async () => {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(profile?.email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ 
        title: "Reset email sent", 
        description: "Check your email for password reset instructions." 
      });
    }
    setLoading(false);
  };

  // Save preferences
  const handleSavePreferences = async () => {
    setLoading(true);
    const settings = {
      notifications: {
        email: emailNotifications,
        push: pushNotifications,
        marketing: marketingEmails
      },
      preferences: {
        language,
        timezone,
        twoFactorAuth
      }
    };

    const { error } = await supabase.from("profiles").update({
      settings: { ...profile?.settings, ...settings }
    }).eq("id", profile.id);
    
    if (error) {
      toast({ title: "Error", description: "Failed to save preferences", variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Preferences updated successfully!" });
      refreshProfile();
    }
    setLoading(false);
  };

  // Account deletion
  const handleDelete = async () => {
    toast({ 
      title: "Contact Support", 
      description: "For security reasons, account deletion must be handled by our support team. Please contact support.",
      variant: "destructive"
    });
    setDeleteConfirm(false);
  };

  return (
    <div className="space-y-6">
      {/* Account Settings */}
      <Card className="bg-white/25 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="change-email">Email Address</Label>
            <div className="flex gap-2 mt-1">
              <Input 
                id="change-email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                disabled={loading} 
              />
              <Button 
                onClick={handleEmailUpdate} 
                disabled={!email || email === profile?.email || loading}
                size="sm"
              >
                Update
              </Button>
            </div>
          </div>
          
          <div>
            <Label>Password Management</Label>
            <div className="space-y-2 mt-2">
              <Input 
                type="password" 
                placeholder="New password"
                value={newPassword} 
                onChange={e => setNewPassword(e.target.value)}
                disabled={loading}
              />
              <Input 
                type="password" 
                placeholder="Confirm new password"
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
              <div className="flex gap-2">
                <Button 
                  onClick={handlePasswordUpdate} 
                  disabled={!newPassword || loading}
                  size="sm"
                >
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handlePasswordReset}
                  disabled={loading}
                  size="sm"
                >
                  Reset Password
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-white/25 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive booking confirmations and updates</p>
            </div>
            <Switch 
              checked={emailNotifications}
              onCheckedChange={setEmailNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">Get notified about special offers</p>
            </div>
            <Switch 
              checked={pushNotifications}
              onCheckedChange={setPushNotifications}
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Receive travel deals and promotions</p>
            </div>
            <Switch 
              checked={marketingEmails}
              onCheckedChange={setMarketingEmails}
            />
          </div>
        </CardContent>
      </Card>

      {/* Privacy & Security */}
      <Card className="bg-white/25 backdrop-blur-md border border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Privacy & Security
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">Add extra security to your account</p>
            </div>
            <Switch 
              checked={twoFactorAuth}
              onCheckedChange={setTwoFactorAuth}
            />
          </div>
          
          <div>
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="hi">हिंदी</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="America/New_York">Eastern Time</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                <SelectItem value="Europe/London">London</SelectItem>
                <SelectItem value="Asia/Kolkata">India Standard Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="bg-red-50/25 backdrop-blur-md border border-red-200/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-red-600">Delete Account</Label>
              <p className="text-sm text-muted-foreground mb-2">
                This action cannot be undone. All your data will be permanently deleted.
              </p>
              {!deleteConfirm ? (
                <Button 
                  variant="destructive" 
                  onClick={() => setDeleteConfirm(true)}
                  size="sm"
                >
                  Delete Account
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button 
                    variant="destructive" 
                    onClick={handleDelete}
                    size="sm"
                  >
                    Confirm Delete
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setDeleteConfirm(false)}
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button 
          onClick={handleSavePreferences} 
          disabled={loading}
          size="lg"
          className="px-8"
        >
          {loading ? 'Saving...' : 'Save All Preferences'}
        </Button>
      </div>
    </div>
  );
};

export default SettingsPanel;
