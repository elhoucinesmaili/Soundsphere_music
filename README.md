# 🎵 Soundsphere

A modern, responsive Spotify-like music streaming web app built with **Next.js**, **TypeScript**, and **Tailwind CSS**.  
Designed by **Elhoucine Smaili** as a full-stack proof-of-concept, Soundsphere showcases seamless music playback, intuitive UI, and a modular architecture ready for API integration.

---

## 📌 Features

- 🎧 Fully functional HTML5 music player  
- 🔍 Search functionality with mocked music data  
- 📑 Playlist creation and management  
- 🔁 Playback controls: play/pause, next/prev, shuffle, repeat  
- ⚙️ Centralized state management (Context API)  
- 🌓 Responsive, dark-mode enabled UI  
- 📱 Mobile-first and desktop-ready design

---

## 🧠 Project Architecture

### Frontend
- **Next.js App Router** for dynamic routing & SSR
- **TypeScript** for safe, robust code
- **Tailwind CSS** for fast, utility-first styling
- **shadcn/ui** for accessible, reusable UI components
- **HTML5 Audio API** for native music playback

### State Management
- Centralized using **React Context API**

### Data
- Mocked JSON data simulating songs, artists, albums

---

## ⚙️ Installation & Development

### 📦 Prerequisites
- Node.js (v18 or later)
- npm or yarn

### 🚀 Local Setup

```bash
# Clone the repository
git clone https://github.com/elhoucinesmaili/Soundsphere_music.git
cd Soundsphere_music

# Install dependencies
npm install
# or
yarn install

# Run the development server
npm run dev
# or
yarn dev
````

> App will be available at `http://localhost:3000`

---

## 💡 Lessons Learned

* Context API is great for global state but consider **Redux** for scaling
* **TypeScript** ensures code reliability — plan your types early
* **Tailwind CSS** accelerates UI but needs structure to avoid clutter
* Modular architecture pays off in maintainability and scalability
* UX feedback (even simulated) leads to better design decisions

---

## 👨‍💻 Author

**Elhoucine Smaili**
Full-Stack Developer | UI/UX Architect
🔗 [GitHub](https://github.com/elhoucinesmaili)

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

MIT License.
Feel free to use, modify, and share — with credit. See the [LICENSE](https://github.com/elhoucinesmaili/Soundsphere_music/blob/main/LICENSE) file for details.

