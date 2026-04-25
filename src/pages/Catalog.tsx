import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

// Чтобы добавить позицию — скопируй один блок { image, name, price, description }
// и вставь его в список ниже. Чтобы изменить — просто отредактируй нужные поля.
const candies = [
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/a0e894a9-f23c-4d07-b3c8-d79334c480f2.jpg",
    name: "Ассорти в коробке",
    price: "от 400 ₽",
    description: "Подарочная коробка с разнообразными конфетами на любой вкус",
  },
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/373b68fa-3940-481f-bcee-2b66d2ae81fd.jpg",
    name: "Мармелад Пчёлка",
    price: "от 450 ₽",
    description: "Мягкий мармелад в форме пчёлок с медовым вкусом",
  },
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/1f1975fd-8844-4e15-895b-3827768cc6f8.jpg",
    name: "Шоколадные трюфели",
    price: "от 600 ₽",
    description: "Изысканные трюфели из тёмного шоколада с нежной начинкой",
  },
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/8760bfb2-f550-449c-8a2b-9ce9ea165654.jpg",
    name: "Карамель",
    price: "от 350 ₽",
    description: "Классические леденцы с фруктовыми и сливочными вкусами",
  },
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/7cbd3041-ac73-4e58-b587-f2d6a6a9e82a.jpg",
    name: "Леденцы на палочке",
    price: "20–80 ₽",
    description: "Яркие леденцы на палочке — любимое лакомство детей",
  },
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/a26acde0-562c-4a34-9695-6cd2a9bc4bac.jpg",
    name: "Ирис в ассортименте",
    price: "от 450 ₽",
    description: "Мягкий и твёрдый ирис в разных вкусах — сливочный, шоколадный, ванильный",
  },
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/6e3316d8-62ce-405f-84f2-318b8ab7da3c.jpg",
    name: "Белый шоколад",
    price: "от 100 ₽",
    description: "Нежные плитки белого шоколада с различными добавками",
  },
];

const Catalog = () => {
  const navigate = useNavigate();

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

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-1">Каталог конфет</h1>
        <p className="text-muted-foreground mb-8">Сладости для любого возраста и повода</p>

        <div className="flex flex-col gap-4">
          {candies.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 bg-card rounded-2xl shadow-sm ring-1 ring-border p-3 hover:shadow-md transition-shadow"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                draggable={false}
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground leading-tight">{item.name}</p>
                <p className="text-sm text-muted-foreground mt-0.5 leading-snug">{item.description}</p>
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-base font-bold text-primary">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Catalog;
