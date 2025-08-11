import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Package, Droplets, Scissors } from "lucide-react";

const inventoryData = [
  {
    category: "Tintas",
    icon: <Droplets className="w-5 h-5" />,
    total: 24,
    lowStock: 3,
    items: [
      { name: "Cyan Pigmentada", quantity: 3, minimum: 1, status: "ok" },
      { name: "Magenta Pigmentada", quantity: 0, minimum: 1, status: "critical" },
      { name: "Amarelo Sublimação", quantity: 1, minimum: 2, status: "low" },
    ],
  },
  {
    category: "Papéis",
    icon: <Package className="w-5 h-5" />,
    total: 12,
    lowStock: 1,
    items: [
      { name: "Papel Fotográfico A4", quantity: 50, minimum: 20, status: "ok" },
      { name: "Papel Transfer", quantity: 5, minimum: 10, status: "low" },
    ],
  },
  {
    category: "Tecidos",
    icon: <Scissors className="w-5 h-5" />,
    total: 8,
    lowStock: 0,
    items: [
      { name: "Algodão Branco", quantity: 15, minimum: 5, status: "ok" },
      { name: "Poliéster", quantity: 8, minimum: 3, status: "ok" },
    ],
  },
];

export function InventoryOverview() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "destructive";
      case "low":
        return "warning";
      default:
        return "success";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "critical":
        return "Crítico";
      case "low":
        return "Baixo";
      default:
        return "OK";
    }
  };

  return (
    <Card className="bg-glass border-glass backdrop-blur-glass">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Visão Geral do Estoque
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {inventoryData.map((category) => (
          <div key={category.category} className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  {category.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {category.category}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.total} itens • {category.lowStock} com estoque baixo
                  </p>
                </div>
              </div>
              {category.lowStock > 0 && (
                <Badge variant="secondary" className="bg-warning/10 text-warning hover:bg-warning/20">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {category.lowStock} alertas
                </Badge>
              )}
            </div>

            <div className="space-y-2 ml-10">
              {category.items.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Estoque: {item.quantity} • Mínimo: {item.minimum}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-16">
                      <Progress
                        value={(item.quantity / (item.minimum * 2)) * 100}
                        className="h-2"
                      />
                    </div>
                    <Badge variant={getStatusColor(item.status) as any}>
                      {getStatusText(item.status)}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}