import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const AUTH_API = "https://functions.poehali.dev/ab408a9c-da60-46eb-ada0-d7c44fff0ff1";

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await fetch(AUTH_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", phone, password }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.ok) {
      localStorage.setItem("admin_token", data.token);
      navigate("/catalog");
    } else {
      setError(data.error || "Ошибка входа");
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <Icon name="ArrowLeft" size={18} />
          На главную
        </button>

        <div className="bg-card rounded-2xl shadow-xl ring-1 ring-border p-8">
          <h1 className="text-2xl font-bold text-foreground mb-1">Вход для администратора</h1>
          <p className="text-muted-foreground text-sm mb-6">Сладкий мир</p>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Телефон</label>
              <input
                type="tel"
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="+7 999 000 00 00"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Пароль</label>
              <input
                type="password"
                className="w-full border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 mt-2"
            >
              {loading ? "Вхожу..." : "Войти"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
