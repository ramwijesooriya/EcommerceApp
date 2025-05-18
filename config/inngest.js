export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      
      // Validate email
      const email = email_addresses.find(addr => addr.id === "primary")?.email_address || 
                   email_addresses[0]?.email_address;
      if (!email) throw new Error("No email found");

      await connectDB();
      
      await User.create({
        clerkId: id,
        email,
        name: `${first_name} ${last_name}`.trim(),
        imageUrl: image_url
      });

    } catch (error) {
      console.error("User creation sync failed:", error);
      throw error;
    }
  }
);