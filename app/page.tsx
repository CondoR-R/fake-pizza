import {
  Container,
  Filters,
  ProductCard,
  Title,
  TopBar,
} from "@/components/shared";

export default function Home() {
  return (
    <>
      <Container className="mt-5">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">Список товаров</div>
            <ProductCard
              id={1}
              name={"Диабло"}
              price={395}
              imageUrl="https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif"
            />
          </div>
        </div>
      </Container>
    </>
  );
}
