import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const API = "https://functions.poehali.dev/d0df612f-6731-48b7-a40d-dac46a740956";
const UPLOAD_API = "https://functions.poehali.dev/f2d4ddc5-d5c2-45fe-bf24-d9521b40d135";

type Item = {
  id?: number;
  name: string;
  price: string;
  description: string;
  image_url: string;
};

const empty: Item = { name: "", price: "", description: "", image_url: "" };

const Catalog = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Item | null>(null);
  const [form, setForm] = useState<Item>(empty);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setEditItem(null);
    setForm(empty);
    setShowForm(true);
  };

  const openEdit = (item: Item) => {
    setEditItem(item);
    setForm({ ...item });
    setShowForm(true);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const res = await fetch(UPLOAD_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const data = await res.json();
      setForm(f => ({ ...f, image_url: data.url }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return;
    setSaving(true);
    if (editItem?.id) {
      await fetch(API, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: editItem.id }),
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }
    await load();
    setSaving(false);
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Удалить позицию?")) return;
    await fetch(`${API}?id=${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <Icon name="ArrowLeft" size={18} />
          Назад
        </button>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-1">Каталог конфет</h1>
            <p className="text-muted-foreground">Сладости для любого возраста и повода</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            <Icon name="Plus" size={16} />
            Добавить
          </button>
        </div>

        {items.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <Icon name="PackageOpen" size={48} />
            <p className="mt-4">Каталог пуст — добавьте первую позицию!</p>
          </div>
        )}

        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 bg-card rounded-2xl shadow-sm ring-1 ring-border p-3 hover:shadow-md transition-shadow group"
            >
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  draggable={false}
                />
              ) : (
                <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                  <Icon name="ImageOff" size={24} />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground leading-tight">{item.name}</p>
                {item.description && (
                  <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{item.description}</p>
                )}
              </div>
              <div className="flex-shrink-0 text-right flex flex-col items-end gap-2">
                <p className="text-base font-bold text-primary">{item.price}</p>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => openEdit(item)}
                    className="p-1.5 rounded-lg hover:bg-accent transition-colors"
                    title="Редактировать"
                  >
                    <Icon name="Pencil" size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id!)}
                    className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"
                    title="Удалить"
                  >
                    <Icon name="Trash2" size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-card rounded-2xl shadow-2xl w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">
              {editItem ? "Редактировать позицию" : "Новая позиция"}
            </h2>

            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Название *</label>
                <input
                  className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Например: Шоколадные трюфели"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Цена *</label>
                <input
                  className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Например: от 300 ₽"
                  value={form.price}
                  onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Описание</label>
                <textarea
                  className="w-full border border-border rounded-xl px-3 py-2 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  placeholder="Краткое описание товара"
                  rows={2}
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Фото</label>
                <div className="flex items-center gap-3">
                  {form.image_url && (
                    <img src={form.image_url} alt="" className="w-16 h-16 rounded-xl object-cover" />
                  )}
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-accent transition-colors text-sm"
                    disabled={uploading}
                  >
                    <Icon name={uploading ? "Loader2" : "Upload"} size={16} />
                    {uploading ? "Загрузка..." : "Загрузить фото"}
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.price}
                className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 text-sm"
              >
                {saving ? "Сохраняю..." : "Сохранить"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-xl border border-border hover:bg-accent transition-colors text-sm"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Catalog;
