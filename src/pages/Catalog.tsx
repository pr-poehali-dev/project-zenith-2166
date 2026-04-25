import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const candies = [
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/a0e894a9-f23c-4d07-b3c8-d79334c480f2.jpg",
    name: "Ассорти в коробке",
    price: "от 400 ₽",
  },
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/373b68fa-3940-481f-bcee-2b66d2ae81fd.jpg",
    name: "Мармелад Пчёлка",
    price: "от 450 ₽",
  },
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/1f1975fd-8844-4e15-895b-3827768cc6f8.jpg",
    name: "Шоколадные трюфели",
    price: "от 600 ₽",
  },
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/8760bfb2-f550-449c-8a2b-9ce9ea165654.jpg",
    name: "Карамель",
    price: "от 350 ₽",
  },
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/7cbd3041-ac73-4e58-b587-f2d6a6a9e82a.jpg",
    name: "Леденцы на палочке",
    price: "20–80 ₽",
  },
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/a26acde0-562c-4a34-9695-6cd2a9bc4bac.jpg",
    name: "Ирис в ассортименте",
    price: "от 450 ₽",
  },
  {
    image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/6e3316d8-62ce-405f-84f2-318b8ab7da3c.jpg",
    name: "Белый шоколад",
    price: "от 100 ₽",
  },
];

const Catalog = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 py-10">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <Icon name="ArrowLeft" size={18} />
          Назад
        </button>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Каталог конфет</h1>
        <p className="text-muted-foreground mb-8">Сладости для любого возраста и повода</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {candies.map((item, i) => (
            <div
              key={i}
              className="bg-card rounded-2xl shadow-md ring-1 ring-border overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground leading-tight">{item.name}</p>
                <p className="text-base font-bold text-primary mt-1">{item.price}</p>
                <button className="mt-3 w-full py-2 rounded-full bg-primary text-primary-foreground text-xs font-medium hover:bg-primary/90 transition-colors">
                  Заказать
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Catalog;
