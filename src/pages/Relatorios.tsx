import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, FileText, TrendingUp, TrendingDown, Package, DollarSign } from "lucide-react";

const vendasData = [
  { mes: "Jan", vendas: 4500, entradas: 6000 },
  { mes: "Fev", vendas: 5200, entradas: 4800 },
  { mes: "Mar", vendas: 4800, entradas: 5500 },
  { mes: "Abr", vendas: 6100, entradas: 3200 },
  { mes: "Mai", vendas: 5800, entradas: 4100 },
  { mes: "Jun", vendas: 7200, entradas: 5800 },
];

const categoriasData = [
  { name: "Eletrônicos", value: 45, color: "hsl(var(--primary))" },
  { name: "Periféricos", value: 25, color: "hsl(var(--success))" },
  { name: "Monitores", value: 15, color: "hsl(var(--warning))" },
  { name: "Armazenamento", value: 10, color: "hsl(var(--destructive))" },
  { name: "Outros", value: 5, color: "hsl(var(--muted-foreground))" },
];

const produtosMaisVendidos = [
  { produto: "Notebook Dell Inspiron", vendas: 45, receita: 112500 },
  { produto: "Mouse Logitech MX", vendas: 120, receita: 10788 },
  { produto: "Monitor 24'' Full HD", vendas: 32, receita: 28768 },
  { produto: "SSD 1TB Samsung", vendas: 78, receita: 35100 },
  { produto: "Teclado Mecânico RGB", vendas: 28, receita: 8400 },
];

export default function Relatorios() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
          <p className="text-muted-foreground">
            Análise e insights do seu estoque
          </p>
        </div>
        <div className="flex gap-3">
          <Select defaultValue="ultimo-mes">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ultimo-mes">Último mês</SelectItem>
              <SelectItem value="ultimos-3-meses">Últimos 3 meses</SelectItem>
              <SelectItem value="ultimo-ano">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Receita Total</p>
                <p className="text-2xl font-bold text-foreground">R$ 195.556</p>
                <p className="text-xs text-success">+12% vs mês anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vendas</p>
                <p className="text-2xl font-bold text-foreground">303</p>
                <p className="text-xs text-success">+8% vs mês anterior</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Produtos Ativos</p>
                <p className="text-2xl font-bold text-foreground">147</p>
                <p className="text-xs text-muted-foreground">+3 novos produtos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Estoque Baixo</p>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-xs text-destructive">Requer atenção</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Vendas vs Entradas */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas vs Entradas</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={vendasData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
                <Bar dataKey="vendas" fill="hsl(var(--primary))" name="Vendas" />
                <Bar dataKey="entradas" fill="hsl(var(--success))" name="Entradas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico de Categorias */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoriasData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoriasData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "6px"
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Produtos Mais Vendidos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Produtos Mais Vendidos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Posição</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Quantidade Vendida</TableHead>
                  <TableHead>Receita Gerada</TableHead>
                  <TableHead>Performance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produtosMaisVendidos.map((produto, index) => (
                  <TableRow key={produto.produto}>
                    <TableCell>
                      <Badge variant="outline">#{index + 1}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">{produto.produto}</TableCell>
                    <TableCell>{produto.vendas} unidades</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(produto.receita)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-muted rounded-full h-2">
                          <div 
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${(produto.vendas / 120) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {Math.round((produto.vendas / 120) * 100)}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}