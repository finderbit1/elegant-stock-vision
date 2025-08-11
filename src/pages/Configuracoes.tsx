import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette,
  Save,
  Download,
  Upload
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";

export default function Configuracoes() {
  const { theme, setTheme } = useTheme();
  const [configuracoes, setConfiguracoes] = useState({
    empresa: {
      nome: "Minha Empresa",
      cnpj: "12.345.678/0001-90",
      endereco: "Rua das Flores, 123",
      telefone: "(11) 9999-9999",
      email: "contato@empresa.com"
    },
    sistema: {
      backupAutomatico: true,
      notificacaoEmail: true,
      limiteEstoqueBaixo: 10,
      moedaPadrao: "BRL",
      fusoHorario: "America/Sao_Paulo"
    },
    seguranca: {
      sessaoTempo: 30,
      loginDuplo: false,
      logAuditoria: true
    }
  });

  const handleSave = () => {
    // Aqui seria a lógica para salvar as configurações
    console.log("Configurações salvas:", configuracoes);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Configurações</h1>
          <p className="text-muted-foreground">
            Gerencie as configurações do sistema
          </p>
        </div>
        <Button onClick={handleSave} className="gap-2">
          <Save className="h-4 w-4" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="geral" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="geral" className="gap-2">
            <Settings className="h-4 w-4" />
            Geral
          </TabsTrigger>
          <TabsTrigger value="empresa" className="gap-2">
            <User className="h-4 w-4" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="gap-2">
            <Bell className="h-4 w-4" />
            Notificações
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="gap-2">
            <Shield className="h-4 w-4" />
            Segurança
          </TabsTrigger>
          <TabsTrigger value="backup" className="gap-2">
            <Database className="h-4 w-4" />
            Backup
          </TabsTrigger>
        </TabsList>

        {/* Configurações Gerais */}
        <TabsContent value="geral">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Aparência
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Tema</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <Select defaultValue="pt-br">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-br">Português (BR)</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Preferências do Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="moeda">Moeda Padrão</Label>
                  <Select defaultValue="BRL">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real (R$)</SelectItem>
                      <SelectItem value="USD">Dólar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuso Horário</Label>
                  <Select defaultValue="America/Sao_Paulo">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/New_York">Nova York (GMT-5)</SelectItem>
                      <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Informações da Empresa */}
        <TabsContent value="empresa">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome-empresa">Nome da Empresa</Label>
                  <Input 
                    id="nome-empresa" 
                    value={configuracoes.empresa.nome}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      empresa: { ...prev.empresa, nome: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ</Label>
                  <Input 
                    id="cnpj" 
                    value={configuracoes.empresa.cnpj}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      empresa: { ...prev.empresa, cnpj: e.target.value }
                    }))}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="endereco">Endereço</Label>
                <Input 
                  id="endereco" 
                  value={configuracoes.empresa.endereco}
                  onChange={(e) => setConfiguracoes(prev => ({
                    ...prev,
                    empresa: { ...prev.empresa, endereco: e.target.value }
                  }))}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input 
                    id="telefone" 
                    value={configuracoes.empresa.telefone}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      empresa: { ...prev.empresa, telefone: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={configuracoes.empresa.email}
                    onChange={(e) => setConfiguracoes(prev => ({
                      ...prev,
                      empresa: { ...prev.empresa, email: e.target.value }
                    }))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notificacoes">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Notificações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Receber alertas importantes por email
                  </p>
                </div>
                <Switch 
                  id="email-notifications"
                  checked={configuracoes.sistema.notificacaoEmail}
                  onCheckedChange={(checked) => setConfiguracoes(prev => ({
                    ...prev,
                    sistema: { ...prev.sistema, notificacaoEmail: checked }
                  }))}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="limite-estoque">Limite para Alerta de Estoque Baixo</Label>
                <Input 
                  id="limite-estoque" 
                  type="number"
                  value={configuracoes.sistema.limiteEstoqueBaixo}
                  onChange={(e) => setConfiguracoes(prev => ({
                    ...prev,
                    sistema: { ...prev.sistema, limiteEstoqueBaixo: parseInt(e.target.value) }
                  }))}
                />
                <p className="text-sm text-muted-foreground">
                  Produtos com quantidade menor que este valor gerarão alertas
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="backup-auto">Backup Automático</Label>
                  <p className="text-sm text-muted-foreground">
                    Realizar backup automático dos dados diariamente
                  </p>
                </div>
                <Switch 
                  id="backup-auto"
                  checked={configuracoes.sistema.backupAutomatico}
                  onCheckedChange={(checked) => setConfiguracoes(prev => ({
                    ...prev,
                    sistema: { ...prev.sistema, backupAutomatico: checked }
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Segurança */}
        <TabsContent value="seguranca">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de Segurança</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="sessao-tempo">Tempo de Sessão (minutos)</Label>
                <Input 
                  id="sessao-tempo" 
                  type="number"
                  value={configuracoes.seguranca.sessaoTempo}
                  onChange={(e) => setConfiguracoes(prev => ({
                    ...prev,
                    seguranca: { ...prev.seguranca, sessaoTempo: parseInt(e.target.value) }
                  }))}
                />
                <p className="text-sm text-muted-foreground">
                  Tempo em minutos antes do usuário ser desconectado automaticamente
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="login-duplo">Autenticação de Dois Fatores</Label>
                  <p className="text-sm text-muted-foreground">
                    Adicionar uma camada extra de segurança ao login
                  </p>
                </div>
                <Switch 
                  id="login-duplo"
                  checked={configuracoes.seguranca.loginDuplo}
                  onCheckedChange={(checked) => setConfiguracoes(prev => ({
                    ...prev,
                    seguranca: { ...prev.seguranca, loginDuplo: checked }
                  }))}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="log-auditoria">Log de Auditoria</Label>
                  <p className="text-sm text-muted-foreground">
                    Manter registro de todas as ações dos usuários
                  </p>
                </div>
                <Switch 
                  id="log-auditoria"
                  checked={configuracoes.seguranca.logAuditoria}
                  onCheckedChange={(checked) => setConfiguracoes(prev => ({
                    ...prev,
                    seguranca: { ...prev.seguranca, logAuditoria: checked }
                  }))}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backup */}
        <TabsContent value="backup">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Backup e Restore</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <Button className="w-full gap-2" variant="outline">
                    <Download className="h-4 w-4" />
                    Fazer Backup Agora
                  </Button>
                  <Button className="w-full gap-2" variant="outline">
                    <Upload className="h-4 w-4" />
                    Restaurar Backup
                  </Button>
                </div>
                <div className="space-y-2">
                  <Label>Último Backup</Label>
                  <p className="text-sm text-muted-foreground">
                    20/01/2024 às 02:00 - Automático
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações de Backup</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Frequência</Label>
                  <Select defaultValue="diario">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="diario">Diário</SelectItem>
                      <SelectItem value="semanal">Semanal</SelectItem>
                      <SelectItem value="mensal">Mensal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Horário</Label>
                  <Input type="time" defaultValue="02:00" />
                </div>
                <div className="space-y-2">
                  <Label>Retenção (dias)</Label>
                  <Input type="number" defaultValue="30" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}