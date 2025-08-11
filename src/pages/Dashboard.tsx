import { StatsCard } from "@/components/dashboard/StatsCard";
import { InventoryOverview } from "@/components/dashboard/InventoryOverview";
import { 
  Package, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  DollarSign,
  Activity
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Bem-vindo ao seu sistema de gestão de estoque
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total de Produtos"
          value={342}
          icon={<Package className="w-6 h-6 text-primary" />}
          trend={{ value: 12, isPositive: true }}
        />
        
        <StatsCard
          title="Entradas (Mês)"
          value={156}
          icon={<TrendingUp className="w-6 h-6 text-success" />}
          trend={{ value: 8, isPositive: true }}
          variant="success"
        />
        
        <StatsCard
          title="Saídas (Mês)"
          value={98}
          icon={<TrendingDown className="w-6 h-6 text-warning" />}
          trend={{ value: -3, isPositive: false }}
          variant="warning"
        />
        
        <StatsCard
          title="Alertas Críticos"
          value={4}
          icon={<AlertTriangle className="w-6 h-6 text-destructive" />}
          variant="destructive"
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title="Valor Total Estoque"
          value="R$ 45.230"
          icon={<DollarSign className="w-6 h-6 text-primary" />}
          trend={{ value: 5, isPositive: true }}
        />
        
        <StatsCard
          title="Movimentações (Hoje)"
          value={23}
          icon={<Activity className="w-6 h-6 text-primary" />}
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Inventory Overview */}
      <InventoryOverview />
    </div>
  );
}