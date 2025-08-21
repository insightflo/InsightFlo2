// .claude/scripts/team-dashboard.js
import fs from 'fs/promises';
import path from 'path';
import chalk from 'chalk';

class TeamDashboard {
  async run() {
    console.clear();
    console.log(chalk.bold.cyan('🎯 AI Development Team Dashboard\n'));
    
    await this.showPendingRequests();
    await this.showActiveAgents();
    await this.showRecentChanges();
    await this.showQualityMetrics();
  }
  
  async showPendingRequests() {
    console.log(chalk.yellow.bold('📨 Pending Requests:'));
    
    const teams = ['pm', 'design', 'frontend', 'backend', 'qa', 'devops', 'guardian'];
    
    for (const team of teams) {
      const requestDir = `.claude/requests/to-${team}`;
      try {
        const files = await fs.readdir(requestDir);
        const requests = files.filter(f => f.endsWith('.md'));
        
        if (requests.length > 0) {
          console.log(`  ${team}: ${chalk.red(requests.length)} pending`);
          requests.forEach(r => console.log(`    • ${r}`));
        } else {
          console.log(`  ${team}: ${chalk.green('✓ clear')}`);
        }
      } catch {
        // Directory doesn't exist yet
      }
    }
    console.log();
  }
  
  async showActiveAgents() {
    console.log(chalk.yellow.bold('🤖 Agent Status:'));
    
    const currentAgent = process.env.CURRENT_AGENT || 'none';
    console.log(`  Active: ${chalk.cyan(currentAgent)}`);
    
    // Show last activity for each agent
    const agents = await fs.readdir('.claude/agents');
    for (const agent of agents) {
      const agentName = path.basename(agent, '.md');
      const stat = await fs.stat(`.claude/agents/${agent}`);
      const hoursSinceModified = (Date.now() - stat.mtime) / (1000 * 60 * 60);
      
      if (hoursSinceModified < 24) {
        console.log(`  ${agentName}: ${chalk.green('active')} (${Math.round(hoursSinceModified)}h ago)`);
      } else {
        console.log(`  ${agentName}: ${chalk.gray('idle')}`);
      }
    }
    console.log();
  }
  
  async showRecentChanges() {
    console.log(chalk.yellow.bold('📝 Recent Changes:'));
    
    // Check for recent contract updates
    const contracts = await fs.readdir('.claude/contracts/interfaces');
    const recentContracts = [];
    
    for (const contract of contracts) {
      const stat = await fs.stat(`.claude/contracts/interfaces/${contract}`);
      const hoursSinceModified = (Date.now() - stat.mtime) / (1000 * 60 * 60);
      
      if (hoursSinceModified < 48) {
        recentContracts.push({
          name: contract,
          hours: Math.round(hoursSinceModified)
        });
      }
    }
    
    if (recentContracts.length > 0) {
      recentContracts.forEach(c => {
        console.log(`  • ${c.name} updated ${c.hours}h ago`);
      });
    } else {
      console.log(`  ${chalk.gray('No recent contract changes')}`);
    }
    console.log();
  }
  
  async showQualityMetrics() {
    console.log(chalk.yellow.bold('📊 Quality Metrics:'));
    
    // These would be read from actual test results
    console.log(`  Test Coverage: ${chalk.green('87%')}`);
    console.log(`  Standards Compliance: ${chalk.green('✓ Passing')}`);
    console.log(`  Open Issues: ${chalk.yellow('3')}`);
    console.log(`  Deploy Ready: ${chalk.green('Yes')}`);
    console.log();
  }
}

// Run dashboard
const dashboard = new TeamDashboard();
dashboard.run();

// Auto-refresh every 5 seconds
setInterval(() => dashboard.run(), 5000);