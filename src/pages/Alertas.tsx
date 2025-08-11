import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Bell,
  Settings,
  Filter,
  RefreshCw
} from "lucide-react";

interface Alerta {
  id: string;
  tipo: "Estoque Baixo" | "Produto Zerado" | "Data Vencimento" | "Sistema";
  produto?: string;
  mensagem: string;
  prioridade: "Alta" | "Média" | "Baixa";
  dataAlerta: string;
  status: "Ativo" | "Resolvido" | "Ignorado";
  quantidadeAtual?: number;
  limiteMinimo?: number;
}

const mockAlertas: Alerta[] = [
  {
    id: "ALT001",
    tipo: "Estoque Baixo",
    produto: "Mouse Logitech MX",
    mensagem: "Produto com estoque baixo - apenas 3 unidades restantes",
    prioridade: "Alta",
    dataAlerta: "2024-01-20T10:30:00",
    status: "Ativo",
    quantidadeAtual: 3,
    limiteMinimo: 10
  },
  {
    id: "ALT002",
    tipo: "Produto Zerado",
    produto: "Teclado Mecânico RGB",
    mensagem: "Produto sem estoque disponível",
    prioridade: "Alta",
    dataAlerta: "2024-01-19T14:15:00",
    status: "Ativo",
    quantidadeAtual: 0,
    limiteMinimo: 5
  },
  {
    id: "ALT003",
    tipo: "Estoque Baixo",
    produto: "Impressora HP LaserJet",
    mensagem: "Produto com estoque baixo - apenas 2 unidades restantes",
    prioridade: "Média",
    dataAlerta: "2024-01-18T09:45:00",
    status: "Resolvido",
    quantidadeAtual: 8,
    limiteMinimo: 5
  },
  {
    id: "ALT004",
    tipo: "Sistema",
    mensagem: "Backup automático realizado com sucesso",
    prioridade: "Baixa",
    dataAlerta: "2024-01-17T02:00:00",
    status: "Resolvido"
  }
];

export default function Alertas() {
  const [alertas] = useState<Alerta[]>(mockAlertas);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [notificacoesAtivas, setNotificacoesAtivas] = useState(true);

  const alertasFiltrados = alertas.filter(alerta => {
    if (filtroStatus === "todos") return true;
    return alerta.status.toLowerCase() === filtroStatus;
  });

  const getPrioridadeVariant = (prioridade: Alerta["prioridade"]) => {
    switch (prioridade) {
      case "Alta":
        return "destructive";
      case "Média":
        return "secondary";
      case "Baixa":
        return "outline";
      default:
        return "outline";
    }
  };

  const getTipoIcon = (tipo: Alerta["tipo"]) => {
    switch (tipo) {
      case "Estoque Baixo":
      case "Produto Zerado":
        return <AlertTriangle className="h-4 w-4" />;
      case "Data Vencimento":
        return <XCircle className="h-4 w-4" />;
      case "Sistema":
        return <Settings className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const getTipoColor = (tipo: Alerta["tipo"]) => {
    switch (tipo) {
      case "Produto Zerado":
        return "text-destructive";
      case "Estoque Baixo":
        return "text-warning";
      case "Data Vencimento":
        return "text-warning";
      case "Sistema":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const alertasAtivos = alertas.filter(a => a.status === "Ativo");
  const alertasAlta = alertas.filter(a => a.prioridade === "Alta" && a.status === "Ativo");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Central de Alertas</h1>
          <p className="text-muted-foreground">
            Monitore alertas e notificações do sistema
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alertas Ativos</p>
                <p className="text-2xl font-bold text-foreground">{alertasAtivos.length}</p>
                <p className="text-xs text-destructive">Requer atenção</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Alta Prioridade</p>
                <p className="text-2xl font-bold text-foreground">{alertasAlta.length}</p>
                <p className="text-xs text-warning">Crítico</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Resolvidos Hoje</p>
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-xs text-success">+2 vs ontem</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configurações de Notificações */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Configurações de Notificações
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="notificacoes-gerais">Notificações Gerais</Label>
                  <p className="text-sm text-muted-foreground">Receber todas as notificações</p>
                </div>
                <Switch 
                  id="notificacoes-gerais"
                  checked={notificacoesAtivas}
                  onCheckedChange={setNotificacoesAtivas}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-alerts">Alertas por Email</Label>
                  <p className="text-sm text-muted-foreground">Enviar alertas importantes por email</p>
                </div>
                <Switch id="email-alerts" defaultChecked />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="limite-estoque">Limite Mínimo Padrão</Label>
                <Input 
                  id="limite-estoque" 
                  type="number" 
                  placeholder="10" 
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Quantidade mínima para gerar alerta de estoque baixo
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Alertas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Lista de Alertas</span>
            <div className="flex gap-2">
              <Button 
                variant={filtroStatus === "todos" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroStatus("todos")}
              >
                Todos
              </Button>
              <Button 
                variant={filtroStatus === "ativo" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroStatus("ativo")}
              >
                Ativos
              </Button>
              <Button 
                variant={filtroStatus === "resolvido" ? "default" : "outline"} 
                size="sm"
                onClick={() => setFiltroStatus("resolvido")}
              >
                Resolvidos
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Mensagem</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Data/Hora</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alertasFiltrados.map((alerta) => (
                  <TableRow key={alerta.id}>
                    <TableCell>
                      <div className={`flex items-center gap-2 ${getTipoColor(alerta.tipo)}`}>
                        {getTipoIcon(alerta.tipo)}
                        <span className="font-medium">{alerta.tipo}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {alerta.produto || "-"}
                      {alerta.quantidadeAtual !== undefined && (
                        <div className="text-xs text-muted-foreground">
                          Atual: {alerta.quantidadeAtual} | Min: {alerta.limiteMinimo}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="max-w-md">
                      <p className="truncate">{alerta.mensagem}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getPrioridadeVariant(alerta.prioridade)}>
                        {alerta.prioridade}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatDateTime(alerta.dataAlerta)}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={alerta.status === "Ativo" ? "destructive" : "outline"}
                      >
                        {alerta.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {alerta.status === "Ativo" && (
                          <>
                            <Button size="sm" variant="outline">
                              Resolver
                            </Button>
                            <Button size="sm" variant="ghost">
                              Ignorar
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          {alertasFiltrados.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-success" />
              <p className="text-lg font-medium">Nenhum alerta encontrado</p>
              <p className="text-sm">Todos os alertas estão resolvidos ou não há novos alertas.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}