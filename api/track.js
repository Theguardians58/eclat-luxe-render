export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process tracking data server-side
    const { deviceInfo, location } = req.body;
    
    // Forward to Supabase or process
    res.status(200).json({ success: true });
  }
}
