import {
  Container,
  Filters,
  ProductGroupList,
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
        <div className="flex gap-[80px]">
          {/* Фильтрация */}
          <div className="w-[250px]">
            <Filters />
          </div>

          {/* Список товаров */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              <ProductGroupList
                title="Пиццы"
                items={[
                  {
                    id: 1,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                    name: "Пицца",
                    items: [{ price: 200 }],
                  },
                  {
                    id: 2,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                    name: "Пицца",
                    items: [{ price: 200 }],
                  },
                  {
                    id: 3,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                    name: "Пицца",
                    items: [{ price: 200 }],
                  },
                  {
                    id: 4,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                    name: "Пицца",
                    items: [{ price: 200 }],
                  },
                ]}
                categoryId={1}
              />
              <ProductGroupList
                title="Комбо"
                items={[
                  {
                    id: 1,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                    name: "Пицца",
                    items: [{ price: 200 }],
                  },
                  {
                    id: 2,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                    name: "Пицца",
                    items: [{ price: 200 }],
                  },
                  {
                    id: 3,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                    name: "Пицца",
                    items: [{ price: 200 }],
                  },
                  {
                    id: 4,
                    imageUrl:
                      "https://media.dodostatic.net/image/r:584x584/019591c69fac7921a27e4ecd8c99f9df.avif",
                    name: "Пицца",
                    items: [{ price: 200 }],
                  },
                ]}
                categoryId={2}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
