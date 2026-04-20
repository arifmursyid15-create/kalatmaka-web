"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const waLink = "https://wa.me/628XXXXXXXXX";

  const layanan = [
    { num: "1 / 4", title: "Desain Interior", desc: "Perencanaan dan konsep ruangan yang disesuaikan dengan selera, kebutuhan, dan budget kamu dari awal hingga akhir." },
    { num: "2 / 4", title: "Plafon PVC", desc: "Pemasangan plafon PVC, gypsum, dan material premium lainnya dengan finishing rapi, bersih, dan tahan lama." },
    { num: "3 / 4", title: "Wallpanel", desc: "Pemasangan wallpanel estetik untuk mempercantik dan menonjolkan karakter setiap sudut ruangan kamu." },
    { num: "4 / 4", title: "Gorden", desc: "Pilihan gorden berkualitas dalam berbagai model, bahan, dan warna sebagai sentuhan akhir yang sempurna." },
  ];

  const keunggulan = [
    { icon: "🛡️", title: "Garansi Pekerjaan", desc: "Setiap proyek dilengkapi garansi resmi sehingga kamu bisa tenang dan percaya pada hasil akhir kami." },
    { icon: "⏰", title: "Tepat Waktu", desc: "Kami berkomitmen menyelesaikan setiap proyek sesuai jadwal yang telah disepakati tanpa keterlambatan." },
    { icon: "👥", title: "Tim Profesional", desc: "Tim kami terdiri dari desainer dan teknisi berpengalaman yang siap mewujudkan setiap detail keinginan kamu." },
    { icon: "💰", title: "Harga Transparan", desc: "Tidak ada biaya tersembunyi. Kami memberikan estimasi harga yang jelas dan jujur sejak awal konsultasi." },
  ];

  const stats = [
    { num: "200+", label: "Proyek Selesai" },
    { num: "5+", label: "Tahun Pengalaman" },
    { num: "98%", label: "Klien Puas" },
  ];

  const portfolio = [
    { label: "PLAFON PVC", name: "Rumah Pak Budi – Surabaya Barat", tall: true },
    { label: "WALLPANEL", name: "Apartemen Bu Rina – Sidoarjo", tall: false },
    { label: "GORDEN", name: "Rumah Bu Dewi – Surabaya Timur", tall: false },
    { label: "DESAIN INTERIOR", name: "Kantor PT. Maju – Surabaya Pusat", tall: false },
  ];

  const testimoni = [
    { initials: "AS", name: "Ahmad S.", loc: "Surabaya Barat", text: "Hasil plafon dan wallpanel dari Kalatmaka benar-benar melebihi ekspektasi. Pengerjaannya sangat rapi, bersih, dan tepat waktu." },
    { initials: "RL", name: "Rina L.", loc: "Sidoarjo", text: "Gordennya bagus sekali, sesuai dengan konsep ruangan yang kami inginkan. Pelayanannya ramah dan sangat responsif." },
    { initials: "DW", name: "Dewi W.", loc: "Surabaya Timur", text: "Desain interior rumah kami jadi jauh lebih cantik. Tim Kalatmaka sangat profesional dan memahami keinginan klien." },
  ];

  return (
    <main style={{ fontFamily: "'Outfit', sans-serif", background: "#071a38", color: "#fff", overflowX: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Outfit:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #071a38; }
        ::-webkit-scrollbar-thumb { background: #f5c518; border-radius: 2px; }
        .nav-link:hover { color: #fff !important; }
        .footer-link:hover { color: #fff !important; }
        .keunggulan-card:hover { border-color: rgba(245,197,24,0.3) !important; transform: translateY(-2px); }
        .service-item:hover .service-arrow { border-color: #f5c518 !important; color: #f5c518 !important; }
        .porto-card:hover .porto-overlay { opacity: 1 !important; }
        @keyframes scrollDown {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        .scroll-line { animation: scrollDown 1.5s ease-in-out infinite; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 60px",
        background: scrolled ? "rgba(7,26,56,0.98)" : "rgba(7,26,56,0.7)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(245,197,24,0.1)",
        transition: "all 0.3s"
      }}>
        <Image src="/logo.png" alt="Kalatmaka" width={150} height={55} style={{ objectFit: "contain" }} />
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Home", "Tentang Kami", "Layanan", "Portofolio", "Kontak"].map(item => (
            <a key={item} href="#" className="nav-link" style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, textDecoration: "none", transition: "color 0.2s" }}>
              {item}
            </a>
          ))}
        </div>
        <a href={waLink}
          style={{ border: "1px solid #f5c518", color: "#f5c518", fontSize: 12, fontWeight: 500, padding: "9px 22px", borderRadius: 100, textDecoration: "none", transition: "all 0.2s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f5c518"; (e.currentTarget as HTMLElement).style.color = "#071a38"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#f5c518"; }}
        >
          Konsultasi Gratis →
        </a>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", height: "100vh", minHeight: 600, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 60px 80px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to bottom, rgba(7,26,56,0.2) 0%, rgba(7,26,56,0.85) 100%), url('https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1920&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.4)", fontSize: 10, letterSpacing: 3 }}>
          <span>SCROLL</span>
          <div className="scroll-line" style={{ width: 1, height: 40, background: "rgba(255,255,255,0.2)" }} />
        </div>
        <div style={{ width: 40, height: 1, background: "rgba(255,255,255,0.4)", marginBottom: 24, position: "relative", zIndex: 1 }} />
        <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(36px, 6vw, 68px)", fontWeight: 400, lineHeight: 1.1, marginBottom: 16, position: "relative", zIndex: 1, maxWidth: 700 }}>
          Wujudkan Ruangan<br />
          <em style={{ color: "#f5c518", fontStyle: "italic" }}>Impian</em> Kamu
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.7, marginBottom: 32, position: "relative", zIndex: 1, maxWidth: 480 }}>
          Jasa desain interior, plafon PVC, wallpanel, dan gorden berkualitas untuk hunian dan komersial di Surabaya.
        </p>
        <a href={waLink} style={{ display: "inline-flex", alignItems: "center", gap: 10, border: "1px solid rgba(255,255,255,0.5)", color: "#fff", fontSize: 13, padding: "14px 28px", borderRadius: 100, textDecoration: "none", position: "relative", zIndex: 1, width: "fit-content" }}>
          Mulai Konsultasi Gratis
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
        </a>
      </section>

      {/* LAYANAN */}
      <section style={{ background: "#071a38", padding: "100px 60px" }}>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.3)" }} />
          Layanan Kami
        </div>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.2 }}>
          Solusi Interior <em style={{ color: "#f5c518" }}>Lengkap</em><br />di Satu Tempat
        </h2>
        <div style={{ marginTop: 64, borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {layanan.map((item, i) => (
            <div key={i} className="service-item" style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr", gap: 40, alignItems: "center", padding: "48px 0", borderBottom: "1px solid rgba(255,255,255,0.08)", cursor: "pointer" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", letterSpacing: 2 }}>{item.num}</div>
              <div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 32, fontWeight: 400, marginBottom: 12 }}>{item.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>{item.desc}</p>
                <div className="service-arrow" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", marginTop: 20, transition: "all 0.2s" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </div>
              </div>
              <div style={{ borderRadius: 12, aspectRatio: "4/3", background: "#132f5a", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>Foto {item.title}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* KEUNGGULAN */}
      <section style={{ background: "#081e3f", padding: "100px 60px" }}>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.3)" }} />
          Mengapa Kalatmaka
        </div>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.2, marginBottom: 60, maxWidth: 600 }}>
          Standar <em style={{ color: "#f5c518" }}>Kualitas</em><br />yang Tidak Kami Kompromikan
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {keunggulan.map((item, i) => (
            <div key={i} className="keunggulan-card" style={{ background: "#0f2d56", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.2s" }}>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{item.icon}</div>
              <h4 style={{ fontSize: 15, fontWeight: 500, marginBottom: 8 }}>{item.title}</h4>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#071a38", padding: "80px 60px", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40, maxWidth: 800 }}>
          {stats.map((item, i) => (
            <div key={i}>
              <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: 56, color: "#f5c518", lineHeight: 1 }}>{item.num}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 8 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section style={{ background: "#081e3f", padding: "100px 60px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.3)" }} />
              Hasil Karya
            </div>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400 }}>
              Proyek <em style={{ color: "#f5c518" }}>Terbaik</em> Kami
            </h2>
          </div>
          <a href="#" style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.7)", fontSize: 12, padding: "10px 22px", borderRadius: 100, textDecoration: "none" }}>Lihat Semua →</a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }}>
          {portfolio.map((item, i) => (
            <div key={i} className="porto-card" style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: item.tall ? "auto" : "4/3", minHeight: item.tall ? 400 : 200, background: "#132f5a", cursor: "pointer", gridRow: item.tall ? "span 2" : "auto" }}>
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 200 }}>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>Foto Proyek</span>
              </div>
              <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(7,26,56,0.8)", color: "rgba(255,255,255,0.8)", fontSize: 10, padding: "5px 12px", borderRadius: 100 }}>{item.label}</div>
              <div className="porto-overlay" style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(7,26,56,0.9) 0%, transparent 50%)", opacity: 0, transition: "opacity 0.3s", display: "flex", alignItems: "flex-end", padding: 20 }}>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONI */}
      <section style={{ background: "#071a38", padding: "100px 60px" }}>
        <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.3)" }} />
          Testimoni
        </div>
        <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, marginBottom: 48 }}>
          Apa Kata <em style={{ color: "#f5c518" }}>Klien</em> Kami
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {testimoni.map((item, i) => (
            <div key={i} style={{ background: "#0f2d56", borderRadius: 16, padding: 28, border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ color: "#f5c518", fontSize: 14, letterSpacing: 2, marginBottom: 16 }}>★★★★★</div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
                &ldquo;{item.text}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#132f5a", border: "1px solid rgba(245,197,24,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 500, color: "#f5c518" }}>{item.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{item.loc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", padding: "120px 60px", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to right, rgba(7,26,56,0.95) 40%, rgba(7,26,56,0.6) 100%), url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 560 }}>
          <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 28, height: 1, background: "rgba(255,255,255,0.3)" }} />
            Mulai Sekarang
          </div>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, lineHeight: 1.2, marginBottom: 16 }}>
            Siap Transformasi<br />Ruangan Kamu?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>
            Hubungi kami sekarang dan dapatkan konsultasi desain secara gratis.
          </p>
          <a href={waLink} style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#f5c518", color: "#071a38", fontSize: 13, fontWeight: 600, padding: "16px 32px", borderRadius: 100, textDecoration: "none" }}>
            Hubungi via WhatsApp →
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#040f1f", padding: "80px 60px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 60, paddingBottom: 60 }}>
          <div>
            <div style={{ marginBottom: 16 }}>
              <Image src="/logo.png" alt="Kalatmaka" width={140} height={50} style={{ objectFit: "contain" }} />
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 24 }}>
              Jasa interior profesional untuk rumah dan bangunan komersial di Surabaya. Plafon PVC, wallpanel, gorden, dan desain interior berkualitas.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["f", "ig", "yt"].map(s => (
                <a key={s} href="#" style={{ width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.4)", fontSize: 12, textDecoration: "none" }}>{s}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>Layanan</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Desain Interior", "Plafon PVC", "Wallpanel", "Gorden"].map(item => (
                <a key={item} href="#" className="footer-link" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}>{item}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>Perusahaan</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {["Tentang Kami", "Portofolio", "Testimoni", "Kontak"].map(item => (
                <a key={item} href="#" className="footer-link" style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", transition: "color 0.2s" }}>{item}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 20, fontWeight: 500 }}>Kontak</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {["+62 8XX-XXXX-XXXX", "info@kalatmaka.com", "Surabaya, Jawa Timur"].map(item => (
                <span key={item} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{item}</span>
              ))}
            </div>
            <h4 style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 12, fontWeight: 500 }}>Jam Operasional</h4>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}>
              Senin – Jumat: 08.00 – 17.00<br />
              Sabtu: 08.00 – 14.00
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>© 2025 Kalatmaka. All rights reserved.</span>
          <span style={{ fontSize: 12, color: "rgba(245,197,24,0.5)", letterSpacing: 1 }}>#DesignThatReflectYou</span>
        </div>
      </footer>

      {/* WA FLOATING */}
      <a href={waLink} target="_blank" style={{ position: "fixed", bottom: 28, right: 28, zIndex: 99, width: 52, height: 52, borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,0.4)", textDecoration: "none" }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

    </main>
  );
}
