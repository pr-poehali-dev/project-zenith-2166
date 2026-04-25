import ArcGalleryHero from "@/components/ArcGalleryHero";

const Index = () => {
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
      price: "450 ₽",
    },
    {
      image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/8760bfb2-f550-449c-8a2b-9ce9ea165654.jpg",
      name: "Карамель",
      price: "220 ₽",
    },
    {
      image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/7cbd3041-ac73-4e58-b587-f2d6a6a9e82a.jpg",
      name: "Леденцы на палочке",
      price: "90 ₽",
    },
    {
      image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/a26acde0-562c-4a34-9695-6cd2a9bc4bac.jpg",
      name: "Карамель Toffee",
      price: "160 ₽",
    },
    {
      image: "https://cdn.poehali.dev/projects/297c7ebc-d318-4ea4-b992-6e3aa23bd6fd/files/03457518-a10c-4610-bd39-5f7d2fa6eb62.jpg",
      name: "Белый шоколад",
      price: "390 ₽",
    },
  ];

  return (
    <main className="relative min-h-screen bg-background">
      <ArcGalleryHero
        items={candies}
        startAngle={20}
        endAngle={160}
        radiusLg={500}
        radiusMd={380}
        radiusSm={270}
        cardSizeLg={140}
        cardSizeMd={110}
        cardSizeSm={85}
        className="pt-16 pb-16 md:pt-20 md:pb-20 lg:pt-24 lg:pb-24"
      />
    </main>
  );
};

export default Index;