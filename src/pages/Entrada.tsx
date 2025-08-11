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
import { Plus, Package, Calendar, User } from "lucide-react";

interface EntradaItem {
  id: string;
  produto: string;
  quantidade: number;
  preco: number;
  fornecedor: string;
  dataEntrada: string;
  status: "Pendente" | "Recebido" | "Cancelado";
  observacoes?: string;
}

const mockEntradas: EntradaItem[] = [
  {
    id: "ENT001",
    produto: "Notebook Dell Inspiron",
    quantidade: 10,
    preco: 2500.00,
    fornecedor: "Dell Brasil",
    dataEntrada: "2024-01-20",
    status: "Recebido"
  },
  {
    id: "ENT002",
    produto: "Mouse Logitech MX",
    quantidade: 50,
    preco: 89.90,
    fornecedor: "Logitech",
    dataEntrada: "2024-01-19",
    status: "Pendente"
  },
  {
    id: "ENT003",
    produto: "Monitor 24'' Full HD",
    quantidade: 15,
    preco: 899.00,
    fornecedor: "LG",
    dataEntrada: "2024-01-18",
    status: "Recebido"
  }
];

export default function Entrada() {
  const [entradas] = useState<EntradaItem[]>(mockEntradas);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusVariant = (status: EntradaItem["status"]) => {
    switch (status) {
      case "Recebido":
        return "default";
      case "Pendente":
        return "secondary";
      case "Cancelado":
        return "destructive";
      default:
        return "default";
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

  const totalValue = entradas.reduce((acc, item) => acc + (item.quantidade * item.preco), 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Entrada de Produtos</h1>
          <p className="text-muted-foreground">
            Registre a entrada de novos produtos no estoque
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Nova Entrada
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Registrar Nova Entrada</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="produto">Produto</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o produto" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="notebook">Notebook Dell Inspiron</SelectItem>
                    <SelectItem value="mouse">Mouse Logitech MX</SelectItem>
                    <SelectItem value="monitor">Monitor 24'' Full HD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="quantidade">Quantidade</Label>
                <Input id="quantidade" type="number" placeholder="0" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preco">Preço Unitário</Label>
                <Input id="preco" type="number" placeholder="0,00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Input id="fornecedor" placeholder="Nome do fornecedor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" placeholder="Observações adicionais..." />
              </div>
              <Button className="w-full">Registrar Entrada</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Entradas</p>
                <p className="text-2xl font-bold text-foreground">{entradas.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Este Mês</p>
                <p className="text-2xl font-bold text-foreground">{entradas.filter(e => e.status === "Recebido").length}</p>
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

      {/* Tabela de Entradas */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Entradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Preço Unit.</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entradas.map((entrada) => (
                  <TableRow key={entrada.id}>
                    <TableCell className="font-mono">{entrada.id}</TableCell>
                    <TableCell className="font-medium">{entrada.produto}</TableCell>
                    <TableCell>{entrada.quantidade}</TableCell>
                    <TableCell>{formatCurrency(entrada.preco)}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(entrada.quantidade * entrada.preco)}
                    </TableCell>
                    <TableCell>{entrada.fornecedor}</TableCell>
                    <TableCell>{formatDate(entrada.dataEntrada)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(entrada.status)}>
                        {entrada.status}
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