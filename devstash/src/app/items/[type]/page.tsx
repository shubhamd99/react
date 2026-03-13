interface ItemsTypePageProps {
  params: Promise<{ type: string }>;
}

export default async function ItemsTypePage({ params }: ItemsTypePageProps) {
  const { type } = await params;
  const title = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-muted-foreground">Coming in a future phase.</p>
    </div>
  );
}
