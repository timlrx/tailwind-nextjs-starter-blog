# PS4 AI Control - Installation Script

echo "Installing dependencies for PS4 AI control..."

# Install Python packages
pip3 install pyremoteplay opencv-python mediapipe numpy stable-baselines3 gym

echo ""
echo "Installation complete!"
echo ""
echo "Quick Start Guide:"
echo "1. Enable Remote Play on your PS4 (Settings > Remote Play)"
echo "2. Find your PS4 IP address (Network settings)"
echo "3. Run the basic controller script"
echo "4. Use hand gestures to control your PS4!"
echo ""
echo "See ps4-ai-guide.md for detailed instructions."