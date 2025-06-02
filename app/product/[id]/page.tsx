import * as React from "react";

type Props = {
  className?: string;
  params: { id: string };
};

export default function ProductPage({ params: { id } }: Props) {
  return <div>{id}</div>;
}
