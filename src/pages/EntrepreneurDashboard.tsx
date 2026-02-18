import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Store, Package, MessageCircle, BarChart3, Crown } from "lucide-react";
import ProfileEditor from "@/components/dashboard/ProfileEditor";
import ListingCard from "@/components/dashboard/ListingCard";
import ListingForm from "@/components/dashboard/ListingForm";
import SubscriptionModal from "@/components/common/SubscriptionModal";
import type { BusinessProfile, Listing } from "@/types";

const emptyProfile: BusinessProfile = {
  id: "",
  userId: "",
  businessName: "",
  description: "",
  contact: "",
  category: "",
  latitude: null,
  longitude: null,
  address: "",
  isPremium: false,
};

const EntrepreneurDashboard = () => {
  const [profile, setProfile] = useState<BusinessProfile>(emptyProfile);
  const [listings, setListings] = useState<Listing[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [subOpen, setSubOpen] = useState(false);

  const handleAddListing = (data: Omit<Listing, "id" | "businessId" | "createdAt">) => {
    const newListing: Listing = {
      ...data,
      id: crypto.randomUUID(),
      businessId: profile.id,
      createdAt: new Date().toISOString(),
    };
    setListings((prev) => [...prev, newListing]);
  };

  const handleDeleteListing = (id: string) => {
    setListings((prev) => prev.filter((l) => l.id !== id));
  };

  const handleToggleAvailability = (id: string, available: boolean) => {
    setListings((prev) => prev.map((l) => (l.id === id ? { ...l, available } : l)));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage your business</p>
        </div>
        <Button variant="outline" size="sm" className="gap-2" onClick={() => setSubOpen(true)}>
          <Crown className="w-4 h-4" />
          Upgrade
        </Button>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile" className="gap-2"><Store className="w-4 h-4" /> Profile</TabsTrigger>
          <TabsTrigger value="listings" className="gap-2"><Package className="w-4 h-4" /> Listings</TabsTrigger>
          <TabsTrigger value="chat" className="gap-2"><MessageCircle className="w-4 h-4" /> Chat</TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2"><BarChart3 className="w-4 h-4" /> Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileEditor profile={profile} onChange={setProfile} />
        </TabsContent>

        <TabsContent value="listings">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-bold">Your Listings</h2>
            <Button size="sm" className="gap-2" onClick={() => { setEditingListing(null); setFormOpen(true); }}>
              <Plus className="w-4 h-4" />
              Add Listing
            </Button>
          </div>
          {listings.length === 0 ? (
            <div className="card-soft text-center py-12">
              <Package className="w-10 h-10 text-muted-foreground/40 mx-auto" />
              <p className="mt-3 text-sm text-muted-foreground">No listings yet. Create your first one!</p>
              <Button size="sm" className="mt-4 gap-2" onClick={() => setFormOpen(true)}>
                <Plus className="w-4 h-4" /> Create Listing
              </Button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((l) => (
                <ListingCard
                  key={l.id}
                  listing={l}
                  editable
                  onEdit={(listing) => { setEditingListing(listing); setFormOpen(true); }}
                  onDelete={handleDeleteListing}
                  onToggleAvailability={handleToggleAvailability}
                />
              ))}
            </div>
          )}
          <ListingForm
            open={formOpen}
            onOpenChange={setFormOpen}
            onSubmit={handleAddListing}
            initial={editingListing}
          />
        </TabsContent>

        <TabsContent value="chat">
          <div className="card-soft text-center py-12">
            <MessageCircle className="w-10 h-10 text-muted-foreground/40 mx-auto" />
            <p className="mt-3 text-sm text-muted-foreground">Chat system will connect to WebSocket server.</p>
            <p className="text-xs text-muted-foreground mt-1">Navigate to <span className="font-medium">/chat</span> for the full chat interface.</p>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: "Total Views", value: "—" },
              { label: "Messages", value: "—" },
              { label: "Listings", value: listings.length.toString() },
            ].map((s) => (
              <div key={s.label} className="card-soft text-center">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="card-soft text-center py-12">
            <BarChart3 className="w-10 h-10 text-muted-foreground/40 mx-auto" />
            <p className="mt-3 text-sm text-muted-foreground">Analytics data will populate when backend is connected.</p>
          </div>
        </TabsContent>
      </Tabs>

      <SubscriptionModal open={subOpen} onOpenChange={setSubOpen} />
    </div>
  );
};

export default EntrepreneurDashboard;
