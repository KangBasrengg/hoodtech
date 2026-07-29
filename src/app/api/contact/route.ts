import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, project, budget, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return Response.json(
        { error: "Nama, email, dan pesan wajib diisi." },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Compose email
    const mailOptions = {
      from: `"Hoodtech Contact Form" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `[Hoodtech] Pesan Baru dari ${name}`,
      html: `
        <div style="font-family: 'Courier New', monospace; background: #0A0E0D; color: #FFFFFF; padding: 32px; border-radius: 8px;">
          <div style="border-bottom: 1px solid #1C2523; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="color: #00FF66; font-size: 20px; margin: 0;">
              &gt; new_message.received()
            </h1>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: #8E9E9B; padding: 8px 16px 8px 0; vertical-align: top; white-space: nowrap;">name:</td>
              <td style="color: #FFFFFF; padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="color: #8E9E9B; padding: 8px 16px 8px 0; vertical-align: top; white-space: nowrap;">email:</td>
              <td style="color: #00FF66; padding: 8px 0;"><a href="mailto:${email}" style="color: #00FF66;">${email}</a></td>
            </tr>
            <tr>
              <td style="color: #8E9E9B; padding: 8px 16px 8px 0; vertical-align: top; white-space: nowrap;">project:</td>
              <td style="color: #FFFFFF; padding: 8px 0;">${project || "Belum ditentukan"}</td>
            </tr>
            <tr>
              <td style="color: #8E9E9B; padding: 8px 16px 8px 0; vertical-align: top; white-space: nowrap;">budget:</td>
              <td style="color: #FFFFFF; padding: 8px 0;">${budget || "Belum ditentukan"}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #11171A; border: 1px solid #1C2523; border-radius: 4px;">
            <div style="color: #8E9E9B; font-size: 12px; margin-bottom: 8px;">// message</div>
            <p style="color: #FFFFFF; margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 24px; color: #8E9E9B; font-size: 12px;">
            <span style="color: #00FF66;">/*</span> Sent via Hoodtech Contact Form <span style="color: #00FF66;">*/</span>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return Response.json({ success: true, message: "Pesan berhasil dikirim!" });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { error: "Gagal mengirim pesan. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
