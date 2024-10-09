interface Document {
  name: string;
  url: string;
}

interface Video {
  name: string;
  url: string;
}

export const documents: Document[] = [
  { name: "Guia do Usuário", url: "https://example.com/user-guide" },
  { name: "Documentação da API", url: "https://example.com/api-docs" },
  { name: "Manual de Instalação", url: "https://example.com/installation-manual" },
  { name: "Notas de Lançamento", url: "https://example.com/release-notes" },
  { name: "Perguntas Frequentes", url: "https://example.com/faq" },
  { name: "Política de Privacidade", url: "https://example.com/privacy-policy" },
  { name: "Termos de Serviço", url: "https://example.com/terms-of-service" },
  { name: "Guia de Integração", url: "https://example.com/integration-guide" },
  { name: "Manual de Backup e Restauração", url: "https://example.com/backup-manual" },
  { name: "Tutorial de Configuração Avançada", url: "https://example.com/advanced-setup" },
  { name: "Guia de Migração de Dados", url: "https://example.com/data-migration-guide" },
  { name: "Guia de Segurança do Sistema", url: "https://example.com/security-guide" },
  { name: "Referência Rápida de Comandos", url: "https://example.com/command-reference" },
  { name: "Guia de Monitoramento", url: "https://example.com/monitoring-guide" },
  { name: "Checklist de Auditoria", url: "https://example.com/audit-checklist" },
  { name: "Plano de Recuperação de Desastres", url: "https://example.com/disaster-recovery-plan" },
];

export const videos: Video[] = [
  { name: "Introdução ao Sistema", url: "https://example.com/intro-video" },
  { name: "Como Usar o Painel", url: "https://example.com/dashboard-video" },
  { name: "Recursos Avançados", url: "https://example.com/advanced-features-video" },
  { name: "Dicas de Solução de Problemas", url: "https://example.com/troubleshooting-video" },
  { name: "Visão Geral do Sistema", url: "https://example.com/system-overview-video" },
  { name: "Configurações Personalizadas", url: "https://example.com/custom-settings-video" },
  { name: "Automatização de Tarefas", url: "https://example.com/task-automation-video" },
  { name: "Integrações com Terceiros", url: "https://example.com/third-party-integration-video" },
  { name: "Gestão de Permissões de Usuário", url: "https://example.com/user-permissions-video" },
  { name: "Monitoramento em Tempo Real", url: "https://example.com/real-time-monitoring-video" },
  { name: "Análise de Desempenho", url: "https://example.com/performance-analysis-video" },
  { name: "Configurações de Notificações", url: "https://example.com/notifications-setup-video" },
  { name: "Melhores Práticas de Segurança", url: "https://example.com/security-best-practices-video" },
  { name: "Guia de Atualizações do Sistema", url: "https://example.com/system-updates-guide-video" },
  { name: "Recuperação de Dados", url: "https://example.com/data-recovery-video" },
  { name: "Configuração de Alertas Personalizados", url: "https://example.com/custom-alerts-video" },
];
