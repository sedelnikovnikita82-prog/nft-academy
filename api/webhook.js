module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(200).send("NFT Gifts Academy bot is running");
  }
  const token = process.env.BOT_TOKEN;
  if (!token) {
    return res.status(500).json({
      ok: false,
      error: "BOT_TOKEN is missing"
    });
  }
  const message = req.body?.message;
  if (!message) {
    return res.status(200).json({ ok: true });
  }
  const chatId = message.chat.id;
  const text = message.text;
  const contact = message.contact;
  async function sendMessage(text, keyboard = undefined) {
    const body = {
      chat_id: chatId,
      text
    };
    if (keyboard) {
      body.reply_markup = keyboard;
    }
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  }
  // Нажатие /start
  if (text === "/start") {
    await sendMessage(
      "👋 Добро пожаловать в NFT Gifts Academy!\n\n" +
      "Чтобы продолжить, зарегистрируйтесь через номер телефона.",
      {
        keyboard: [
          [
            {
              text: "📱 Зарегистрироваться",
              request_contact: true
            }
          ]
        ],
        resize_keyboard: true,
        one_time_keyboard: true
      }
    );
    return res.status(200).json({ ok: true });
  }
  // Пользователь отправил номер
  if (contact) {
    await sendMessage(
      "Вы успешно прошли регистрацию ✅\n\n" +
      "Если вы действительно хотите научиться трейдить NFT-подарки, " +
      "напишите @menegeracadem — он вас проведёт с нуля.",
      {
        remove_keyboard: true
      }
    );
    return res.status(200).json({ ok: true });
  }
  return res.status(200).json({ ok: true });
};
