import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp, Users, DollarSign, Cpu, AlertTriangle, ShieldAlert,
  BarChart3, RefreshCw, LayoutDashboard, ArrowRight, Activity,
  Calendar, Globe, ChevronRight, Plus
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import DashboardHero from '../components/DashboardHero';
import MetricsCard from '../components/MetricsCard';
import AgentCard from '../components/AgentCard';
import WorkflowDiagram from '../components/WorkflowDiagram';
import { useAuth } from '../context/AuthContext';
import { workspaceService } from '../services/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [workspace, setWorkspace] = useState(null);
  const [myWorkspaces, setMyWorkspaces] = useState([]);
  const [loadingWorkspaces, setLoadingWorkspaces] = useState(true);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState(null);

  // Fetch user's workspaces from API
  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        setLoadingWorkspaces(true);
        const response = await workspaceService.getMyWorkspaces();
        setMyWorkspaces(response.workspaces || []);

        // Check for locally stored active workspace first
        const localData = localStorage.getItem('active_workspace_data');
        if (localData) {
          try {
            const parsed = JSON.parse(localData);
            setWorkspace(parsed);
            setSelectedWorkspaceId(parsed.workspace_id);
          } catch (err) {
            console.error('Failed to parse local workspace state:', err);
          }
        }
      } catch (err) {
        console.error('Failed to fetch workspaces:', err);
        // Fallback to localStorage if API fails
        const data = localStorage.getItem('active_workspace_data');
        if (data) {
          try {
            const parsed = JSON.parse(data);
            setWorkspace(parsed);
          } catch (err) {
            console.error('Failed to parse workspace state:', err);
          }
        }
      } finally {
        setLoadingWorkspaces(false);
      }
    };

    fetchWorkspaces();
  }, []);

  const handleSelectWorkspace = async (ws) => {
    setSelectedWorkspaceId(ws.workspace_id);
    // Format workspace data for the dashboard display
    setWorkspace({
      workspace_id: ws.workspace_id,
      startup_name: ws.startup_name,
      domain: ws.domain,
      mode: ws.mode,
      startup_description: ws.startup_description,
      startup_state: ws.startup_state,
    });
  };

  const handleResetWorkspace = () => {
    localStorage.removeItem('active_workspace_data');
    setWorkspace(null);
    setSelectedWorkspaceId(null);
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Founder';

  // Empty / Workspace List State
  if (!workspace) {
    return (
      <div className="relative min-h-[85vh] py-8 px-6 overflow-hidden">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Welcome back, <span className="text-white">{displayName}</span>
          </h1>
          <p className="text-neutral-400 text-sm mt-1.5">
            {user?.email}
          </p>
        </motion.div>

        {/* Workspace List Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-medium tracking-wide text-neutral-500 block uppercase">
                Your Workspaces
              </span>
              <h2 className="text-lg font-semibold text-white tracking-tight mt-0.5">
                Startup Workspaces
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/create-startup"
                className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white hover:bg-neutral-200 text-black text-sm font-semibold transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>New Workspace</span>
              </Link>
            </div>
          </div>

          {loadingWorkspaces ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex items-center gap-3 text-neutral-400">
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span className="text-sm">Loading your workspaces...</span>
              </div>
            </div>
          ) : myWorkspaces.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-xl mx-auto surface-elevated rounded-xl p-8 md:p-10 text-center space-y-6"
            >
              <div className="mx-auto w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500">
                <LayoutDashboard className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-tight">No Workspaces Yet</h2>
                <p className="text-neutral-400 text-sm max-w-md mx-auto leading-relaxed">
                  Create your first startup workspace or upload documents to begin AI-powered analysis.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                <Link
                  to="/create-startup"
                  className="py-3 px-4 rounded-lg bg-white hover:bg-neutral-200 text-black text-sm font-semibold transition duration-300 flex items-center justify-center gap-1.5"
                >
                  <span>Create Startup</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/optimize-startup"
                  className="py-3 px-4 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-800 text-sm font-semibold transition duration-300 flex items-center justify-center gap-1.5"
                >
                  <span>Optimize Startup</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myWorkspaces.map((ws, index) => (
                <motion.div
                  key={ws.workspace_id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleSelectWorkspace(ws)}
                  className={`workspace-list-card group ${
                    selectedWorkspaceId === ws.workspace_id ? 'border-neutral-500 bg-neutral-900' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-medium tracking-wide uppercase px-2 py-0.5 rounded ${
                        ws.mode === 'creation' 
                          ? 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                          : 'bg-neutral-800 text-neutral-300 border border-neutral-700'
                      }`}>
                        {ws.mode}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                  </div>

                  <h3 className="text-base font-semibold text-white tracking-tight mb-1.5 group-hover:text-neutral-300 transition-colors">
                    {ws.startup_name}
                  </h3>

                  <p className="text-xs text-neutral-500 mb-3 line-clamp-2 leading-relaxed">
                    {ws.startup_description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-neutral-600">
                    <div className="flex items-center gap-1.5">
                      <Globe className="w-3 h-3" />
                      <span className="truncate max-w-[120px]">{ws.domain}</span>
                    </div>
                    {ws.created_at && (
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(ws.created_at).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  // Extract core state details
  const name = workspace.startup_name || 'Generic Workspace';
  const domain = workspace.domain || 'SaaS / Cloud';
  const mode = workspace.mode || 'creation';
  const description = workspace.startup_description || '';
  
  const stateObj = workspace.final_state || workspace.startup_state || {};
  
  const ctoFeedback = stateObj.architecture?.cto_recommendation || 
                      stateObj.architecture?.current_architecture || 
                      'CTO Agent evaluation incomplete.';

  const financeFeedback = stateObj.finance?.finance_recommendation || 
                          'Finance Agent cost assessment incomplete.';

  const hiringFeedback = stateObj.hiring?.hiring_recommendation || 
                         'Hiring Agent headcount planning incomplete.';

  const marketingFeedback = stateObj.marketing?.marketing_recommendation || 
                            'Marketing Agent GTM assessment incomplete.';

  // Metrics
  const isCreation = mode === 'creation';
  const teamSizeVal = isCreation ? '5 Core Hires' : (stateObj.hiring?.team_size || '14 Personnel');
  const monthlyBurnVal = isCreation ? '$12,500 / mo' : (stateObj.finance?.monthly_burn ? `$${Number(stateObj.finance.monthly_burn).toLocaleString()} / mo` : '$34,000 / mo');
  const cloudCostVal = isCreation ? '$450 / mo' : (stateObj.finance?.monthly_cloud_cost ? `$${Number(stateObj.finance.monthly_cloud_cost).toLocaleString()} / mo` : '$6,800 / mo');
  const riskVal = isCreation ? 'Low' : 'Moderate';
  const optScoreVal = isCreation ? '98%' : '78%';
  
  const riskPercentage = isCreation ? 12 : 64;
  const optPercentage = isCreation ? 98 : 78;

  // Chart Data
  const costProjectionData = isCreation ? [
    { name: 'M1', spending: 450, optimized: 400 },
    { name: 'M2', spending: 600, optimized: 520 },
    { name: 'M3', spending: 950, optimized: 750 },
    { name: 'M4', spending: 1500, optimized: 1100 },
    { name: 'M5', spending: 2200, optimized: 1600 },
    { name: 'M6', spending: 3100, optimized: 2100 }
  ] : [
    { name: 'Month 1', spending: 6800, optimized: 5400 },
    { name: 'Month 2', spending: 7500, optimized: 5900 },
    { name: 'Month 3', spending: 8200, optimized: 6300 },
    { name: 'Month 4', spending: 9400, optimized: 6900 },
    { name: 'Month 5', spending: 11200, optimized: 7800 },
    { name: 'Month 6', spending: 13500, optimized: 8500 }
  ];

  const organizationalRadarData = [
    { subject: 'Infrastructure', A: isCreation ? 95 : 45, fullMark: 100 },
    { subject: 'Eng. Velocity', A: isCreation ? 98 : 70, fullMark: 100 },
    { subject: 'Runway', A: isCreation ? 90 : 55, fullMark: 100 },
    { subject: 'Marketing', A: isCreation ? 85 : 65, fullMark: 100 },
    { subject: 'Product Fit', A: isCreation ? 96 : 80, fullMark: 100 },
    { subject: 'Talent', A: isCreation ? 92 : 60, fullMark: 100 }
  ];

  return (
    <div className="relative min-h-[90vh] py-8 px-6 space-y-8 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6 relative z-10">
        <div>
          <p className="text-sm text-neutral-400 mb-1">
            Welcome back, <span className="text-white font-medium">{displayName}</span>
          </p>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-1">Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.location.reload()}
            className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition duration-300"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleResetWorkspace}
            className="px-4 py-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-semibold hover:bg-neutral-800 hover:text-white transition-all duration-300"
          >
            All Workspaces
          </button>
        </div>
      </div>

      {/* Hero Banner */}
      <DashboardHero
        name={name}
        domain={domain}
        mode={mode}
        description={description}
        userName={displayName}
      />

      {/* Pipeline Visualization */}
      <WorkflowDiagram activeAgent="marketing_agent" />

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 relative z-10">
        <MetricsCard
          title="Team Size"
          value={teamSizeVal}
          subtitle="Engineering allocations"
          icon={Users}
          colorTheme="black"
        />
        <MetricsCard
          title="Monthly Burn"
          value={monthlyBurnVal}
          subtitle="Operational expenses"
          icon={DollarSign}
          colorTheme="black"
        />
        <MetricsCard
          title="Cloud Cost"
          value={cloudCostVal}
          subtitle="Infrastructure spend"
          icon={Cpu}
          colorTheme="black"
        />
        <MetricsCard
          title="Risk Level"
          value={riskVal}
          subtitle="Vulnerability index"
          icon={ShieldAlert}
          colorTheme="black"
          percentage={riskPercentage}
        />
        <MetricsCard
          title="Optimization"
          value={optScoreVal}
          subtitle="Efficiency score"
          icon={TrendingUp}
          colorTheme="black"
          percentage={optPercentage}
        />
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-3 gap-6 relative z-10">
        {/* Cost Projection */}
        <div className="lg:col-span-2 surface-card rounded-xl p-6 flex flex-col justify-between h-[360px] border-neutral-800">
          <div>
            <span className="text-[11px] font-medium tracking-wide text-neutral-500 block uppercase">Budget Forecast</span>
            <h3 className="text-lg font-semibold text-white tracking-tight">Cloud Cost Optimization (6-Month)</h3>
          </div>

          <div className="w-full h-56 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={costProjectionData}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ffffff" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#ffffff" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorOpt" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#888888" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#888888" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#666666" fontSize={11} tickLine={false} />
                <YAxis stroke="#666666" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#111111', border: '1px solid #333333', borderRadius: '8px', fontSize: '12px' }} />
                <Area type="monotone" dataKey="spending" name="Current Spend" stroke="#ffffff" strokeWidth={1.5} fillOpacity={1} fill="url(#colorSpend)" />
                <Area type="monotone" dataKey="optimized" name="Optimized" stroke="#888888" strokeWidth={1.5} fillOpacity={1} fill="url(#colorOpt)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Radar Chart */}
        <div className="surface-card rounded-xl p-6 flex flex-col justify-between h-[360px] border-neutral-800">
          <div>
            <span className="text-[11px] font-medium tracking-wide text-neutral-500 block uppercase">Performance Radar</span>
            <h3 className="text-lg font-semibold text-white tracking-tight">Organizational Balance</h3>
          </div>

          <div className="w-full h-56 mt-4 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" radius="70%" data={organizationalRadarData}>
                <PolarGrid stroke="#333333" />
                <PolarAngleAxis dataKey="subject" stroke="#888888" fontSize={9} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#444444" fontSize={9} />
                <Radar name="Organization" dataKey="A" stroke="#ffffff" fill="#ffffff" fillOpacity={0.12} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Agent Analysis */}
      <div className="space-y-6 relative z-10">
        <div className="border-b border-neutral-800 pb-3">
          <span className="text-[11px] font-medium tracking-wide text-neutral-500 block uppercase">Recommendations</span>
          <h3 className="text-lg font-bold text-white tracking-tight mt-0.5">Agent Analysis</h3>
        </div>

        <div className="space-y-4">
          <AgentCard
            title="Technical Architecture"
            agentName="CTO Agent"
            colorTheme="black"
            contentData={ctoFeedback}
          />
          <AgentCard
            title="Financial Planning"
            agentName="Finance Agent"
            colorTheme="black"
            contentData={financeFeedback}
          />
          <AgentCard
            title="Talent & Hiring Strategy"
            agentName="Hiring Agent"
            colorTheme="black"
            contentData={hiringFeedback}
          />
          <AgentCard
            title="Growth & Marketing"
            agentName="Marketing Agent"
            colorTheme="black"
            contentData={marketingFeedback}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
