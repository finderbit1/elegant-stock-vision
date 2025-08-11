import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";

interface Product {
  id: string;
  nome: string;
  categoria: string;
  quantidade: number;
  preco: number;
  status: "Em Estoque" | "Estoque Baixo" | "Sem Estoque";
  dataEntrada: string;
  fornecedor: string;
}

const mockProducts: Product[] = [
  {
    id: "1",
    nome: "Notebook Dell Inspiron",
    categoria: "Eletrônicos",
    quantidade: 15,
    preco: 2500.00,
    status: "Em Estoque",
    dataEntrada: "2024-01-15",
    fornecedor: "Dell Brasil"
  },
  {
    id: "2",
    nome: "Mouse Logitech MX",
    categoria: "Periféricos",
    quantidade: 3,
    preco: 89.90,
    status: "Estoque Baixo",
    dataEntrada: "2024-01-10",
    fornecedor: "Logitech"
  },
  {
    id: "3",
    nome: "Teclado Mecânico RGB",
    categoria: "Periféricos",
    quantidade: 0,
    preco: 299.99,
    status: "Sem Estoque",
    dataEntrada: "2024-01-05",
    fornecedor: "HyperX"
  },
  {
    id: "4",
    nome: "Monitor 24'' Full HD",
    categoria: "Monitores",
    quantidade: 8,
    preco: 899.00,
    status: "Em Estoque",
    dataEntrada: "2024-01-20",
    fornecedor: "LG"
  },
  {
    id: "5",
    nome: "SSD 1TB Samsung",
    categoria: "Armazenamento",
    quantidade: 25,
    preco: 450.00,
    status: "Em Estoque",
    dataEntrada: "2024-01-18",
    fornecedor: "Samsung"
  },
  {
    id: "6",
    nome: "Impressora HP LaserJet",
    categoria: "Impressoras",
    quantidade: 2,
    preco: 1200.00,
    status: "Estoque Baixo",
    dataEntrada: "2024-01-12",
    fornecedor: "HP Inc"
  }
];

export default function Estoque() {
  const [products] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product =>
    product.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.fornecedor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusVariant = (status: Product["status"]) => {
    switch (status) {
      case "Em Estoque":
        return "default";
      case "Estoque Baixo":
        return "secondary";
      case "Sem Estoque":
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Controle de Estoque</h1>
          <p className="text-muted-foreground">
            Gerencie seus produtos e controle o estoque
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Adicionar Produto
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Produtos</span>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Preço Unitário</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Entrada</TableHead>
                  <TableHead>Fornecedor</TableHead>
                  <TableHead className="w-[50px]">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.nome}
                    </TableCell>
                    <TableCell>{product.categoria}</TableCell>
                    <TableCell>
                      <span className={`font-medium ${
                        product.quantidade === 0 
                          ? 'text-destructive' 
                          : product.quantidade <= 5 
                            ? 'text-warning' 
                            : 'text-success'
                      }`}>
                        {product.quantidade}
                      </span>
                    </TableCell>
                    <TableCell>{formatCurrency(product.preco)}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(product.status)}>
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(product.dataEntrada)}</TableCell>
                    <TableCell>{product.fornecedor}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash2 className="h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum produto encontrado
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}