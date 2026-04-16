// Dados mestre simulando Jira/Notion (Sprint 07)
const projects = [
    // Linha de Destaque (Ativos) - Effort 100
    { 
        id: 'muvpv', name: 'GPA PV (MUVPV)', color: '#FF5C39', deadline: '02 JUN 2026', 
        sprintStart: 1, sprintEnd: 10, tasks: '120/180', progress: 60, completion: 60, active: true, effort: 100,
        okrList: [
            { title: 'O1 · Clusterização de Clientes', krs: [{ name: 'Saudável', val: 100 }, { name: 'Risco', val: 80 }, { name: 'Fantasma', val: 50 }, { name: 'Potencial', val: 20 }] },
            { title: 'O2 · Elevação do Ticket Médio', krs: [{ name: 'Aumento 15%', val: 40 }] },
            { title: 'O3 · Retenção B2B', krs: [{ name: 'Churn < 5%', val: 90 }] }
        ]
    },
    { 
        id: 'saga', name: 'SAGA', color: '#FF5C39', deadline: '30 JUN 2026', 
        sprintStart: 3, sprintEnd: 12, tasks: '50/200', progress: 25, completion: 25, active: true, effort: 100,
        okrList: [
            { title: 'O1 · Clusterização de Clientes', krs: [{ name: 'Saudável', val: 60 }, { name: 'Risco', val: 40 }, { name: 'Fantasma', val: 10 }, { name: 'Potencial', val: 0 }] },
            { title: 'O2 · Expansão Territorial', krs: [{ name: 'Novas Praças', val: 30 }] },
            { title: 'O3 · Eficiência Comercial', krs: [{ name: 'Conversão', val: 50 }] }
        ]
    },
    { id: 'intcom', name: 'Inteligência Comercial 2.0', color: '#FF5C39', deadline: '19 MAI 2026', sprintStart: 6, sprintEnd: 9, tasks: '10/50', progress: 20, completion: 20, active: true, effort: 100 },
    { id: 'biparts', name: 'BI Parts', color: '#FF5C39', deadline: '05 MAI 2026', sprintStart: 6, sprintEnd: 8, tasks: '25/40', progress: 60, completion: 60, active: true, effort: 100 },
    { id: 'plrm', name: 'PLR-M', color: '#FF5C39', deadline: '30 JUN 2026', sprintStart: 7, sprintEnd: 12, tasks: '0/0', progress: 0, completion: 0, active: true, effort: 100 },
    { id: 'auditoria', name: 'Auditoria de Descontos', color: '#FF5C39', deadline: '05 MAI 2026', sprintStart: 7, sprintEnd: 8, tasks: '0/0', progress: 0, completion: 0, active: true, effort: 100 },
    
    // Linha Cinza (Discovery) - Effort 50
    { id: 'hiveparts', name: 'HiveParts', color: '#64748B', deadline: '30 JUN 2026', sprintStart: 7, sprintEnd: 12, tasks: '0/0', progress: 0, completion: 0, active: false, effort: 50, tag: 'DISCOVERY' },
    { id: 'sac', name: 'SAC', color: '#64748B', deadline: '30 JUN 2026', sprintStart: 9, sprintEnd: 12, tasks: '0/0', progress: 0, completion: 0, active: false, effort: 50, tag: 'DISCOVERY' },
    { id: 'sugcompra', name: 'Sugestão de Compra', color: '#64748B', deadline: '30 JUN 2026', sprintStart: 10, sprintEnd: 12, tasks: '0/0', progress: 0, completion: 0, active: false, effort: 50, tag: 'DISCOVERY' },
    { id: 'dashveic', name: 'Dash Veículos', color: '#64748B', deadline: '30 JUN 2026', sprintStart: 11, sprintEnd: 12, tasks: '0/0', progress: 0, completion: 0, active: false, effort: 50, tag: 'DISCOVERY' },
    { id: 'tokenizacao', name: 'Tokenização', color: '#64748B', deadline: '30 JUN 2026', sprintStart: 11, sprintEnd: 12, tasks: '0/0', progress: 0, completion: 0, active: false, effort: 50, tag: 'DISCOVERY' },
    
    // Prioridade Baixa (Notion) - Effort 15
    { id: 'unimassey', name: 'Unimassey', color: '#64748B', deadline: '30 JUN 2026', sprintStart: 12, sprintEnd: 12, tasks: '0/0', progress: 0, completion: 0, active: false, effort: 15, tag: 'DISCOVERY' },
    { id: 'pedidoitavema', name: 'Pedido Automático ITAVEMA', color: '#64748B', deadline: '30 JUN 2026', sprintStart: 11, sprintEnd: 12, tasks: '0/0', progress: 0, completion: 0, active: false, effort: 15, tag: 'DISCOVERY' },
    { id: 'sazonalidade', name: 'Sazonalidade', color: '#64748B', deadline: '16 JUN 2026', sprintStart: 9, sprintEnd: 11, tasks: '0/0', progress: 0, completion: 0, active: false, effort: 15, tag: 'DISCOVERY' },
    { id: 'roteirizacao', name: 'Roteirização', color: '#64748B', deadline: '16 JUN 2026', sprintStart: 9, sprintEnd: 11, tasks: '0/0', progress: 0, completion: 0, active: false, effort: 15, tag: 'DISCOVERY' }
];

const backlog = [
    { name: 'GeoReferenciamento' }, { name: 'GAC' },
    { name: 'Tickets Movidesk' }, { name: 'Power BI' },
    { name: 'Banco MUV' }, { name: 'MUV Pay' }, { name: 'AppMuvstok' }
];

function renderProjects() {
    const container = document.getElementById('projects-container');
    
    // Update Header Stats
    document.getElementById('stat-total').innerText = projects.length;
    document.getElementById('stat-ativos').innerText = projects.filter(p => !p.tag).length;
    document.getElementById('stat-discovery').innerText = projects.filter(p => p.tag === 'DISCOVERY').length;

    projects.forEach(p => {
        let sprintsHTML = '';
        const currentSprint = 7;
        
        let sprintsFaltantesText = '';
        let diff = -1;
        let alertClass = 'text-zinc-600';
        let alertIcon = '';

        if (p.sprintEnd > currentSprint) {
            diff = p.sprintEnd - currentSprint;
            sprintsFaltantesText = `Faltam ${diff} Sprint${diff > 1 ? 's' : ''}`;
        } else if (p.sprintEnd === currentSprint) {
            diff = 0;
            sprintsFaltantesText = 'Last Sprint';
        } else {
            sprintsFaltantesText = 'Concluído'; // Segurança
        }

        if (diff === 0 || diff === 1) {
            alertClass = 'text-orange-500';
            alertIcon = '<i class="fas fa-exclamation-triangle ml-1"></i>';
        }

        for (let i = p.sprintStart; i <= p.sprintEnd; i++) {
            let stateClass = '';
            let style = '';
            let connectorClass = '';
            
            if (p.id === 'biparts' && i === p.sprintEnd) {
                stateClass = 'delivered';
                style = 'background-color: #EF4444; color: #FFFFFF; font-weight: 800; border: 1px solid rgba(239,68,68,0.5);'; // Red for unexpected extra sprint
                connectorClass = '';
            } else if (i < currentSprint) {
                stateClass = 'delivered';
                style = `background-color: ${p.color}`;
                connectorClass = 'conn-check';
            } else if (i === currentSprint) {
                stateClass = 'current delivered';
                style = `background-color: ${p.color}`;
                connectorClass = p.sprintEnd > i ? (p.id === 'biparts' ? 'conn-risk' : 'conn-trans') : '';
            } else {
                stateClass = '';
                style = '';
                connectorClass = i < p.sprintEnd ? '' : ''; // empty connector
            }
            
            sprintsHTML += `<div class="hex ${stateClass}" style="${style}">${i.toString().padStart(2, '0')}</div>`;
            if (i < p.sprintEnd) {
                sprintsHTML += `<div class="connector ${connectorClass}"></div>`;
            }
        }

        const card = document.createElement('div');
        card.className = `okr-card ${p.active ? 'active' : ''}`;
        card.id = `proj-${p.id}`;
        
        const okrSectionContent = p.okrList ? p.okrList.map(obj => `
            <div class="mb-5 last:mb-0 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                <p class="text-[8px] font-black uppercase mb-1" style="color: ${p.color}">OBJETIVO ESTRATÉGICO</p>
                <p class="text-[10px] font-bold text-zinc-100 mb-3">${obj.title}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    ${obj.krs.map(kr => `
                        <div>
                            <div class="flex justify-between items-center mb-0.5">
                                <span class="label-tiny">${kr.name}</span>
                                <span class="text-[7px] font-bold">${kr.val}%</span>
                            </div>
                            <div class="pg-bar"><div class="pg-fill" style="width: ${kr.val}%; background-color: ${p.color}; opacity: 0.6"></div></div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('') : '<p class="text-[8px] text-zinc-500 uppercase font-black">Nenhum OKR detalhado</p>';

        const tagBadge = p.tag ? `<span class="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400 text-[8px] font-bold border border-zinc-700 ml-2 tracking-widest">${p.tag}</span>` : '';

        card.innerHTML = `
            <div class="okr-header flex justify-between items-center bg-zinc-900/20" onclick="toggleOkr('proj-${p.id}')">
                <div class="flex items-center gap-3">
                    <div class="w-1 h-5" style="background-color: ${p.color}"></div>
                    <h3 class="font-bold text-[11px] text-zinc-100 uppercase tracking-tight flex items-center">${p.name} ${tagBadge}</h3>
                </div>
                <div class="flex items-center gap-3">
                    <i class="fas fa-chevron-down text-zinc-700 text-[10px] chevron-icon"></i>
                </div>
            </div>
            <div class="okr-content">
                <div class="project-dense-row">
                    <div class="project-info-cell">
                        <div>
                            <span class="text-[7px] font-black uppercase" style="color: ${p.color}">Target Deadline</span>
                            <p class="text-xl font-black text-white leading-none">${p.deadline}</p>
                            <p class="text-[8px] font-bold uppercase mt-1 ${alertClass}">${sprintsFaltantesText} ${alertIcon}</p>
                        </div>
                        <button onclick="toggleSubContent(event, 'okr-sub-${p.id}')" class="mt-6 flex items-center gap-2 group">
                            <span class="text-[8px] font-black text-zinc-400 group-hover:text-white uppercase tracking-widest">Detalhes OKR</span>
                            <i class="fas fa-plus text-[7px] text-zinc-600 group-hover:text-white"></i>
                        </button>
                    </div>
                    <div class="project-sprints-cell">
                        <span class="label-tiny">Cronograma de Sprints (Global)</span>
                        <div class="hex-grid">
                            ${sprintsHTML}
                        </div>
                    </div>
                </div>
                <div id="okr-sub-${p.id}" class="okr-dropdown">
                    ${okrSectionContent}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function toggleOkr(id) {
    const card = document.getElementById(id);
    if(card) card.classList.toggle('active');
}

function toggleSubContent(event, subId) {
    event.stopPropagation();
    const sub = document.getElementById(subId);
    if(sub) sub.classList.toggle('open');
    const icon = event.currentTarget.querySelector('i');
    icon.classList.toggle('fa-plus');
    icon.classList.toggle('fa-minus');
}

window.onload = function() {
    renderProjects();
    
    const ctxRadar = document.getElementById('radarEff').getContext('2d');
    new Chart(ctxRadar, {
        type: 'radar',
        data: {
            labels: projects.map(p => {
                // Return simple acronym to fit nicely visually
                return p.id.toUpperCase().substring(0, 10);
            }),
            datasets: [{
                label: 'Esforço',
                data: projects.map(p => p.effort),
                backgroundColor: 'rgba(255, 92, 57, 0.15)',
                borderColor: '#FF5C39',
                borderWidth: 1.5,
                pointRadius: 1
            }]
        },
        options: {
            scales: {
                r: {
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { display: false },
                    pointLabels: { color: '#64748B', font: { size: 8, weight: '800' } }
                }
            },
            plugins: { legend: { display: false } }
        }
    });

    const ctxBar = document.getElementById('barProjectsBI').getContext('2d');
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
            datasets: [{
                label: 'Inícios',
                data: [1, 1, 2, 3, 4, 3],
                backgroundColor: '#FF5C39',
                borderRadius: 4,
                barThickness: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    beginAtZero: true, 
                    max: 5,
                    grid: { color: 'rgba(255,255,255,0.05)' },
                    ticks: { color: '#64748B', font: { size: 7 } }
                },
                x: { 
                    grid: { display: false },
                    ticks: { color: '#64748B', font: { size: 7, weight: '800' } }
                }
            },
            plugins: { legend: { display: false } }
        }
    });
};
