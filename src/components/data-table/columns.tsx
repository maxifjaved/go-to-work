export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type Status = 'Backlog' | 'Todo' | 'In Progress' | 'In Review' | 'Done' | 'Archived';
export type TaskType = 'Bug' | 'Feature' | 'Enhancement' | 'Documentation' | 'Research';
export type Visibility = 'Public' | 'Private' | 'Team' | 'Restricted';

export interface ActivityDetails {
    field?: string;
    oldValue?: string | number | boolean;
    newValue?: string | number | boolean;
    comment?: string;
}

export interface CustomField {
    id: number;
    name: string;
    type: 'Text' | 'Number' | 'Date' | 'Select' | 'MultiSelect' | 'User' | 'URL';
    options?: string[];
    required: boolean;
    entityType: 'Task' | 'Project' | 'Epic' | 'Sprint';
    defaultValue?: string | number | Date | string[];
    order: number;
    isActive: boolean;
}

export interface IntegrationConfig {
    url: string;
    token: string;
    options: {
        syncInterval: number;
        enabled: boolean;
        syncFields: string[];
    };
}

export interface AutomationCondition {
    field: string;
    operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';
    value: string | number | boolean;
}

export interface AutomationAction {
    type: string;
    config: {
        field?: string;
        value?: string | number | boolean;
        notification?: {
            users: number[];
            message: string;
        };
    };
}

export interface TaskMetrics {
    assignedTasks: number;
    completedTasks: number;
    averageCompletionTime: number;
}

export interface BudgetBreakdown {
    development: number;
    testing: number;
    design: number;
    management: number;
    infrastructure: number;
    marketing: number;
    other: number;
}

export interface TaskDistribution {
    Backlog: number;
    Todo: number;
    'In Progress': number;
    'In Review': number;
    Done: number;
    Archived: number;
}


export interface UserPreferences {
    notifications: {
        email: boolean;
        push: boolean;
        desktop: boolean;
        frequency: 'Instant' | 'Daily' | 'Weekly';
        types: string[];
    };
    theme: 'Light' | 'Dark' | 'System';
    defaultView: 'List' | 'Board' | 'Calendar';
    timeFormat: '12h' | '24h';
    defaultDashboard: string;
}

export interface WorkSchedule {
    start: string;
    end: string;
    timeZone: string;
    daysOfWeek: boolean[];
    holidays: string[];
    vacations: {
        start: string;
        end: string;
        type: string;
    }[];
}

export interface User {
    id: number;
    email: string;
    name: string;
    title: string;
    designation: string;
    age: number;
    address: string;
    language: string;
    timeZone: string;
    role: string;
    department: string;
    avatar: string;
    status: 'Active' | 'Away' | 'Offline' | 'Do Not Disturb';
    lastActive: string;
    teams: number[];
    skills: string[];
    projectsOwned: number[];
    workSchedule: WorkSchedule;
    preferences: UserPreferences;
    lastLoginAt: string;
    lastLogoutAt: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
    isAdmin: boolean;
    isSuperAdmin: boolean;
}

export interface Comment {
    id: number;
    taskId: number;
    userId: number;
    userName?: string;
    userAvatar?: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    mentions: number[];
    attachments: Attachment[];
    reactions: Reaction[];
    isEdited: boolean;
    isDeleted: boolean;
    parentCommentId?: number;
    childComments: number[];
}

export interface Attachment {
    id: number;
    name: string;
    url: string;
    type: string;
    size: number;
    uploadedBy: number;
    uploadedByName?: string;
    uploadedAt: string;
    isDeleted: boolean;
    deletedAt?: string;
    deletedBy?: number;
}

export interface Reaction {
    id: number;
    emoji: string;
    userId: number;
    userName?: string;
    createdAt: string;
}

export interface RecurringPattern {
    frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
    interval: number;
    endDate?: string;
    endAfterOccurrences?: number;
    daysOfWeek?: number[];
    monthDay?: number;
    weekNumber?: number;
}

export interface TaskCustomStatus {
    id: number;
    name: string;
    color: string;
    category: Status;
    description?: string;
    icon?: string;
    order: number;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: Status;
    statusOrder: number;
    priority: Priority;
    priorityOrder: number;
    type: TaskType;
    createdAt: string;
    updatedAt: string;
    dueDate: string;
    dueTime: string;
    estimatedHours: number;
    actualHours: number;
    assigneeId: number;
    assigneeName?: string;
    assigneeAvatar?: string;
    reporterId: number;
    reporterName?: string;
    reporterAvatar?: string;
    projectId: number;
    projectName?: string;
    projectKey?: string;
    sprintId: number;
    sprintName?: string;
    epicId: number;
    epicName?: string;
    parentTaskId: number | null;
    parentTaskKey?: string;
    subtasks: number[];
    subTasksCount: number;
    completedSubTasksCount: number;
    tags: string[];
    attachments: Attachment[];
    attachmentsCount: number;
    comments: Comment[];
    commentsCount: number;
    watchers: number[];
    watchersCount: number;
    blockedBy: number[];
    blocks: number[];
    isBlocked: boolean;
    progress: number;
    customFields: CustomField[];
    storyPoints: number;
    originalEstimate: number;
    remainingEstimate: number;
    environment: 'Development' | 'Staging' | 'Production';
    version: string;
    dependencies: number[];
    linkedTasks: {
        taskId: number;
        taskKey?: string;
        taskTitle?: string;
        relationship: 'relates_to' | 'duplicates' | 'blocks' | 'is_blocked_by' | 'implements' | 'fixes';
    }[];
    activity: {
        date: string;
        userId: number;
        userName?: string;
        action: 'created' | 'updated' | 'commented' | 'status_changed' | 'assigned';
        details: ActivityDetails;
    }[];
    labels: string[];
    startDate?: string;
    completedAt?: string;
    estimatedCompletionDate: string;
    weight: number;
    order: number;
    key: string;
    timeZone: string;
    lastViewedAt: string;
    subscribedUsers: number[];
    isFlagged: boolean;
    isStarred: boolean;
    reminderSet: boolean;
    reminderTime?: string;
    isRecurring: boolean;
    recurringPattern?: RecurringPattern;
    customStatus?: TaskCustomStatus;
    isDeleted: boolean;
    deletedAt?: string;
    deletedBy?: number;
}

export interface TimeEntry {
    id: number;
    taskId: number;
    userId: number;
    startTime: string;
    endTime: string;
    duration: number;
    description: string;
    billable: boolean;
    category: string;
    createdAt: string;
    updatedAt: string;
    isRunning: boolean;
}

export interface Sprint {
    id: number;
    name: string;
    goal: string;
    startDate: string;
    endDate: string;
    status: 'Planning' | 'Active' | 'Completed' | 'Cancelled';
    projectId: number;
    projectName?: string;
    projectKey?: string;
    tasks: number[];
    tasksCount: number;
    completedTasksCount: number;
    createdAt: string;
    createdBy: number;
    createdByName?: string;
    updatedAt: string;
    order: number;
    isDeleted: boolean;
    metrics: {
        totalPoints: number;
        completedPoints: number;
        velocity: number;
        taskDistribution: TaskDistribution;
        burndownData: Array<{date: string; remainingPoints: number}>;
        efficiency: number;
        scope_change: number;
    };
}

export interface Epic {
    id: number;
    title: string;
    description: string;
    status: 'New' | 'In Progress' | 'Done';
    startDate: string;
    targetDate: string;
    projectId: number;
    projectName?: string;
    projectKey?: string;
    tasks: number[];
    tasksCount: number;
    completedTasksCount: number;
    progress: number;
    owner: number;
    ownerName?: string;
    ownerAvatar?: string;
    priority: Priority;
    priorityOrder: number;
    createdAt: string;
    updatedAt: string;
    order: number;
    key: string;
    customFields: CustomField[];
    isDeleted: boolean;
    dependencies: number[];
}

export interface Milestone {
    id: number;
    name: string;
    description: string;
    dueDate: string;
    status: 'Not Started' | 'In Progress' | 'Completed' | 'Delayed';
    progress: number;
    tasks: number[];
    dependencies: number[];
    owner: number;
    budget?: number;
    actualCost?: number;
    createdAt: string;
    updatedAt: string;
    isDeleted: boolean;
}

export interface Risk {
    id: number;
    description: string;
    probability: 'Low' | 'Medium' | 'High';
    impact: 'Low' | 'Medium' | 'High';
    mitigationPlan: string;
    status: 'Open' | 'Mitigated' | 'Closed';
    owner: number;
    createdAt: string;
    updatedAt: string;
}

export interface Integration {
    id: number;
    type: string;
    config: IntegrationConfig;
    status: 'Active' | 'Inactive';
    lastSyncAt: string;
    errors?: string[];
}

export interface Automation {
    id: number;
    name: string;
    description: string;
    trigger: {
        type: string;
        conditions: AutomationCondition[];
    };
    actions: {
        type: string;
        config: IntegrationConfig;
    }[];
    isActive: boolean;
    createdBy: number;
    updatedAt: string;
    lastRunAt?: string;
    runCount: number;
}

export interface Project {
    id: number;
    name: string;
    description: string;
    key: string;
    visibility: Visibility;
    category: string;
    department: string;
    status: 'Active' | 'On Hold' | 'Completed' | 'Archived';
    createdAt: string;
    updatedAt: string;
    startDate: string;
    endDate: string;
    owner: number;
    ownerName?: string;
    ownerAvatar?: string;
    team: number[];
    teamMembers?: {
        id: number;
        name: string;
        avatar: string;
        role: string;
        joinedAt: string;
        lastActiveAt: string;
    }[];
    epics: Epic[];
    epicsCount: number;
    completedEpicsCount: number;
    sprints: Sprint[];
    sprintsCount: number;
    completedSprintsCount: number;
    tasks: Task[];
    tasksCount: number;
    completedTasksCount: number;
    tags: string[];
    customFields: CustomField[];
    settings: {
        defaultAssignee: number;
        defaultAssigneeName?: string;
        defaultPriority: Priority;
        allowSubtasks: boolean;
        requireEstimates: boolean;
        workingDays: boolean[];
        workingHours: {start: string; end: string};
        timeZone: string;
        dateFormat: string;
        timeFormat: string;
    };
    metrics: {
        totalTasks: number;
        completedTasks: number;
        overdueCards: number;
        averageCycleTime: number;
        sprintVelocity: number[];
        taskDistribution: TaskDistribution;
        memberPerformance: Map<number, TaskMetrics>;

    };
    budget: {
        allocated: number;
        spent: number;
        remaining: number;
        currency: string;
        lastUpdated: string;
        breakdown: BudgetBreakdown;
    };
    milestones: Milestone[];
    risks: Risk[];
    customStatuses: TaskCustomStatus[];
    integrations: Integration[];
    automations: Automation[];
    isTemplate: boolean;
    isDeleted: boolean;
    deletedAt?: string;
    deletedBy?: number;
}