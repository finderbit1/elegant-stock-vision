import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Minus, TrendingDown, ShoppingCart, User } from "lucide-react";

interface SaidaItem {
  id: string;
  produto: string;
  quantidade: number;
  preco: number;
  cliente: string;
  dataSaida: string;
  status: "Pendente" | "Entregue" | "Cancelado";
  motivo: string;
  observacoes?: string;
}

const mockSaidas: SaidaItem[] = [
  {
    id: "SAI001",
    produto: "Notebook Dell Inspiron",
    quantidade: 2,
    preco: 2500.00,
    cliente: "Empresa ABC Ltda",
    dataSaida: "2024-01-20",
    status: "Entregue",
    motivo: "Venda"
  },
  {
    id: "SAI002",
    produto: "Mouse Logitech MX",
    quantidade: 5,
    preco: 89.90,
    cliente: "João Silva",
    dataSaida: "2024-01-19",
    status: "Pendente",
    motivo: "Venda"
  },
  {
    id: "SAI003",
    produto: "Teclado Mecânico RGB",
    quantidade: 1,
    preco: 299.99,
    cliente: "Defeito de Fábrica",
    dataSaida: "2024-01-18",
    status: "Entregue",
    motivo: "Devolução"
  }
];

export default function Saida() {
  const [saidas] = useState<SaidaItem[]>(mockSaidas);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusVariant = (status: SaidaItem["status"]) => {
    switch (status) {
      case "Entregue":
        return "default";
      case "Pendente":
        return "secondary";
      case "Cancelado":
        return "destructive";
      default:
        return "default";
    }
  };

  const getMotivoVariant = (motivo: string) => {
    switch (motivo.toLowerCase()) {
      case "venda":
        return "text-success";
      case "devolução":
        return "text-warning";
      case "perda":
        return "text-destructive";
      default:
        return "text-foreground";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const totalValue = saidas.reduce((acc, item) => acc + (item.quantidade * item.preco), 0);
  const vendas = saidas.filter(s => s.motivo === "Venda");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Saída de Produtos</h1>
          <p className="text-muted-foreground">
            Registre a saída de produtos do estoque
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Minus className="h-4 w-4" />
              Nova Saída
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Nova Saída</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="produto">Produto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notebook">Notebook Dell Inspiron (15 disponíveis)</SelectItem>
                    <SelectItem value="mouse">Mouse Logitech MX (3 disponíveis)</SelectItem>
                    <SelectItem value="monitor">Monitor 24'' Full HD (8 disponíveis)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input id="quantidade" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motivo">Motivo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o motivo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="venda">Venda</SelectItem>
                    <SelectItem value="devolucao">Devolução</SelectItem>
                    <SelectItem value="perda">Perda/Avaria</SelectItem>
                    <SelectItem value="transferencia">Transferência</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliente">Cliente/Destino</Label>
                <Input id="cliente" placeholder="Nome do cliente ou destino" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" placeholder="Observações adicionais..." />
              </div>
              <Button className="w-full">Registrar Saída</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <TrendingDown className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Saídas</p>
                <p className="text-2xl font-bold text-foreground">{saidas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Vendas</p>
                <p className="text-2xl font-bold text-foreground">{vendas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <User className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Valor Total</p>
                <p className="text-2xl font-bold text-foreground">{formatCurrency(totalValue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Saídas */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Saídas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Valor Unit.</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Cliente/Destino</TableHead>
                  <TableHead>Motivo</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {saidas.map((saida) => (
                  <TableRow key={saida.id}>
                    <TableCell className="font-mono">{saida.id}</TableCell>
                    <TableCell className="font-medium">{saida.produto}</TableCell>
                    <TableCell>{saida.quantidade}</TableCell>
                    <TableCell>{formatCurrency(saida.preco)}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(saida.quantidade * saida.preco)}
                    </TableCell>
                    <TableCell>{saida.cliente}</TableCell>
                    <TableCell>
                      <span className={getMotivoVariant(saida.motivo)}>
                        {saida.motivo}
                      </span>
                    </TableCell>
                    <TableCell>{formatDate(saida.dataSaida)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(saida.status)}>
                        {saida.status}
                      </Badge>
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