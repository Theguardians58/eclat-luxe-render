import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Loader2, User, Calendar as CalendarIcon, Phone, Instagram, Mail, Eye, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { logError } from '@/utils/errorLogger';

export default function Account() {
  const { user, loading: authLoading, signOut } = useAuth();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [birthday, setBirthday] = useState<Date | undefined>();
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      getProfile();
    }
  }, [user]);

  const getProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, avatar_url, birthday, phone, instagram_account')
        .eq('id', user!.id)
        .single();

      if (error) throw error;

      if (data) {
        setFullName(data.full_name || '');
        setAvatarUrl(data.avatar_url || '');
        setBirthday(data.birthday ? new Date(data.birthday) : undefined);
        setPhone(data.phone || '');
        setInstagram(data.instagram_account || '');
      }
    } catch (error: any) {
      logError(error, { 
        errorType: 'network', 
        additionalInfo: { operation: 'getProfile' } 
      });

      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update({ 
          full_name: fullName,
          birthday: birthday ? format(birthday, 'yyyy-MM-dd') : null,
          phone: phone,
          instagram_account: instagram
        })
        .eq('id', user!.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
      setIsEditing(false);
    } catch (error: any) {
      logError(error, { 
        errorType: 'network', 
        additionalInfo: { operation: 'updateProfile' } 
      });

      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${user!.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user!.id);

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      toast({
        title: "Success",
        description: "Avatar updated successfully",
      });
    } catch (error: any) {
      logError(error, { 
        errorType: 'network', 
        additionalInfo: { operation: 'uploadAvatar' } 
      });

      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="relative gradient-hover h-48 rounded-b-[3rem] flex items-center justify-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 text-primary-foreground hover:bg-white/20"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-primary-foreground text-2xl font-display">{fullName || 'Your Profile'}</h1>
        </div>

        {/* Avatar - Overlapping header and content */}
        <div className="flex justify-center -mt-16 mb-6 relative">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-background shadow-intense">
              <AvatarImage src={avatarUrl} alt={fullName} />
              <AvatarFallback className="text-3xl bg-card text-foreground">
                {fullName?.[0]?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 cursor-pointer bg-accent rounded-full p-2 hover:bg-primary transition-smooth"
              >
                <Loader2 className={cn("h-4 w-4 text-accent-foreground", uploading && "animate-spin")} />
                <Input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                  className="hidden"
                />
              </Label>
            )}
          </div>
        </div>

        {/* Profile Fields */}
        <div className="bg-card mx-4 rounded-2xl shadow-soft">
          <div className="divide-y divide-border">
            {/* Name Field */}
            <div className="flex items-center px-6 py-4 space-x-4">
              <User className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              {isEditing ? (
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="border-0 focus-visible:ring-0 p-0"
                />
              ) : (
                <span className="text-muted-foreground">{fullName || 'Add your name'}</span>
              )}
            </div>

            {/* Birthday Field */}
            <div className="flex items-center px-6 py-4 space-x-4">
              <CalendarIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              {isEditing ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "justify-start text-left font-normal p-0 h-auto hover:bg-transparent",
                        !birthday && "text-muted-foreground"
                      )}
                    >
                      {birthday ? format(birthday, "PPP") : "Select birthday"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={birthday}
                      onSelect={setBirthday}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              ) : (
                <span className="text-muted-foreground">
                  {birthday ? format(birthday, "PPP") : 'Add birthday'}
                </span>
              )}
            </div>

            {/* Phone Field */}
            <div className="flex items-center px-6 py-4 space-x-4">
              <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              {isEditing ? (
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone number"
                  type="tel"
                  className="border-0 focus-visible:ring-0 p-0"
                />
              ) : (
                <span className="text-muted-foreground">{phone || 'Add phone number'}</span>
              )}
            </div>

            {/* Instagram Field */}
            <div className="flex items-center px-6 py-4 space-x-4">
              <Instagram className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              {isEditing ? (
                <Input
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  placeholder="Instagram account"
                  className="border-0 focus-visible:ring-0 p-0"
                />
              ) : (
                <span className="text-muted-foreground">{instagram || 'Add Instagram'}</span>
              )}
            </div>

            {/* Email Field */}
            <div className="flex items-center px-6 py-4 space-x-4">
              <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground">{user?.email}</span>
            </div>

            {/* Password Field */}
            <div className="flex items-center px-6 py-4 space-x-4">
              <Eye className="h-5 w-5 text-muted-foreground flex-shrink-0" />
              <span className="text-muted-foreground">••••••••</span>
            </div>
          </div>

          {/* Edit Profile Button */}
          <div className="px-6 py-6">
            {isEditing ? (
              <div className="flex gap-2">
                <Button
                  onClick={updateProfile}
                  disabled={loading}
                  className="flex-1 bg-primary hover:bg-accent text-primary-foreground rounded-full h-12"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="rounded-full h-12"
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="w-full bg-primary hover:bg-accent text-primary-foreground rounded-full h-12 text-base"
              >
                Edit profile
              </Button>
            )}
          </div>

          {/* Sign Out Button */}
          <div className="px-6 pb-6">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full rounded-full h-12"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
