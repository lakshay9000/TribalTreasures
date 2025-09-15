import { UserProfile } from '../../types';
import { Mail, Phone, MapPin, Edit } from 'lucide-react';

interface ProfileSectionProps {
  profile: UserProfile;
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function ProfileSection({ profile }: ProfileSectionProps) {
  const initials = getInitials(profile.name);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-6 mb-6">
        {profile.avatar ? (
          <img 
            src={profile.avatar} 
            alt={profile.name} 
            className="w-24 h-24 rounded-full object-cover"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-amber-600 text-white flex items-center justify-center text-2xl font-bold">
            {initials}
          </div>
        )}
        <div>
          <h2 className="text-2xl font-bold">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
        <button className="ml-auto p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Edit size={20} />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-600">
          <Mail size={20} />
          <span>{profile.email}</span>
        </div>
        {profile.phone && (
          <div className="flex items-center gap-3 text-gray-600">
            <Phone size={20} />
            <span>{profile.phone}</span>
          </div>
        )}
        {profile.address && (
          <div className="flex items-center gap-3 text-gray-600">
            <MapPin size={20} />
            <span>{profile.address}</span>
          </div>
        )}
      </div>
    </div>
  );
}