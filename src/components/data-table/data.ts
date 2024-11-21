import {
    randEmail,
    randFullName,
    randJobTitle,
    randAvatar,
    randNumber,
    randRecentDate,
    randPastDate,
    randFutureDate,
    randSkill,
    randParagraph,
    randPhrase,
    randWord,
    randDepartment,
    randBoolean,
    randUuid,
    randUrl,
    randFileType,
    randEmoji,
    randCurrencyCode,
    randColor
} from '@ngneat/falso';
import {
    BudgetBreakdown,
    CustomField,
    Priority,
    RecurringPattern,
    Status,
    TaskCustomStatus, TaskMetrics,
    TaskType,
    Visibility,
    Comment, Task
} from "@/components/data-table/columns";

// Constants for data generation
const USERS = 5;
const PROJECTS = 5;
const TASKS_PER_PROJECT = 10;
const COMMENTS_PER_TASK = 5;
const ATTACHMENTS_PER_TASK = 3;
const EPICS_PER_PROJECT = 5;
const CHILD_COMMENTS_PER_COMMENT = 2;

const timeZones = [
    'UTC',
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney',
    'Pacific/Auckland'
];

// Options arrays
const priorityOptions: Priority[] = ['Low', 'Medium', 'High', 'Urgent'];
const statusOptions: Status[] = ['Backlog', 'Todo', 'In Progress', 'In Review', 'Done', 'Archived'];
const taskTypeOptions: TaskType[] = ['Bug', 'Feature', 'Enhancement', 'Documentation', 'Research'];
const visibilityOptions: Visibility[] = ['Public', 'Private', 'Team', 'Restricted'];

// Utility functions
const getRandomItem = <T>(array: T[]): T => array[Math.floor(Math.random() * array.length)];
const getRandomSubset = <T>(array: T[], min = 1, max = array.length): T[] => {
    const size = randNumber({min, max});
    return [...array].sort(() => 0.5 - Math.random()).slice(0, size);
};

// Helper generators
const generateCustomFields = (entityType: 'Task' | 'Project' | 'Epic' | 'Sprint'): CustomField[] =>
    Array.from({length: 3}, (_, id) => ({
        id,
        name: randWord(),
        type: getRandomItem(['Text', 'Number', 'Date', 'Select', 'MultiSelect', 'User', 'URL']),
        options: Array.from({length: 5}, () => randWord()),
        required: randBoolean(),
        entityType,
        defaultValue: randWord(),
        order: id,
        isActive: true
    }));

const generateRecurringPattern = (): RecurringPattern => ({
    frequency: getRandomItem(['Daily', 'Weekly', 'Monthly', 'Yearly']),
    interval: randNumber({min: 1, max: 30}),
    endDate: randFutureDate().toISOString(),
    endAfterOccurrences: randNumber({min: 1, max: 52}),
    daysOfWeek: Array.from({length: 7}, () => randNumber({min: 0, max: 6})),
    monthDay: randNumber({min: 1, max: 28}),
    weekNumber: randNumber({min: 1, max: 4})
});

const generateTaskCustomStatus = (): TaskCustomStatus => ({
    id: randNumber({min: 1, max: 1000}),
    name: randWord(),
    color: randColor(),
    category: getRandomItem(statusOptions),
    description: randPhrase(),
    icon: 'icon-name',
    order: randNumber({min: 1, max: 100})
});

const generateBudgetBreakdown = (): BudgetBreakdown => ({
    development: randNumber({min: 10000, max: 100000}),
    testing: randNumber({min: 5000, max: 50000}),
    design: randNumber({min: 5000, max: 50000}),
    management: randNumber({min: 10000, max: 100000}),
    infrastructure: randNumber({min: 5000, max: 50000}),
    marketing: randNumber({min: 5000, max: 50000}),
    other: randNumber({min: 1000, max: 10000})
});

const generateTaskMetrics = (): TaskMetrics => ({
    assignedTasks: randNumber({min: 0, max: 50}),
    completedTasks: randNumber({min: 0, max: 30}),
    averageCompletionTime: randNumber({min: 1, max: 14})
});

// Main data generator
const generateFullMockData = () => {
    // Generate Users
    const users = Array.from({length: USERS}, (_, id) => ({
        id,
        email: randEmail(),
        name: randFullName(),
        title: randJobTitle(),
        designation: randJobTitle(),
        age: randNumber({min: 21, max: 65}),
        address: randPhrase(),
        language: 'English',
        timeZone: getRandomItem(timeZones),
        role: randJobTitle(),
        department: randDepartment(),
        avatar: randAvatar(),
        status: getRandomItem(['Active', 'Away', 'Offline', 'Do Not Disturb']),
        lastActive: randRecentDate().toISOString(),
        teams: [],
        skills: getRandomSubset(Array.from({length: 20}, () => randSkill())),
        projectsOwned: [],
        workSchedule: {
            start: '09:00',
            end: '17:00',
            timeZone: getRandomItem(timeZones),
            daysOfWeek: Array(7).fill(true),
            holidays: Array.from({length: 5}, () => randFutureDate().toISOString()),
            vacations: Array.from({length: 2}, () => ({
                start: randFutureDate().toISOString(),
                end: randFutureDate().toISOString(),
                type: getRandomItem(['Vacation', 'Sick', 'Personal'])
            }))
        },
        preferences: {
            notifications: {
                email: randBoolean(),
                push: randBoolean(),
                desktop: randBoolean(),
                frequency: getRandomItem(['Instant', 'Daily', 'Weekly']),
                types: ['task_assigned', 'mention', 'due_date']
            },
            theme: getRandomItem(['Light', 'Dark', 'System']),
            defaultView: getRandomItem(['List', 'Board', 'Calendar']),
            timeFormat: getRandomItem(['12h', '24h']),
            defaultDashboard: 'main'
        },
        lastLoginAt: randRecentDate().toISOString(),
        lastLogoutAt: randRecentDate().toISOString(),
        createdAt: randPastDate().toISOString(),
        updatedAt: randRecentDate().toISOString(),
        isActive: true,
        isAdmin: randBoolean(),
        isSuperAdmin: false
    }));

    // Generate Attachments
    const attachments = Array.from({length: ATTACHMENTS_PER_TASK * TASKS_PER_PROJECT * PROJECTS}, (_, id) => ({
        id,
        name: randWord(),
        url: randUrl(),
        type: randFileType(),
        size: randNumber({min: 1000, max: 10000000}),
        uploadedBy: getRandomItem(users).id,
        uploadedByName: users.find(u => u.id === getRandomItem(users).id)?.name,
        uploadedAt: randPastDate().toISOString(),
        isDeleted: false,
    }));

    // Generate Projects with Epics
    const projects = Array.from({length: PROJECTS}, (_, id) => {
        const owner = getRandomItem(users).id;
        const team = getRandomSubset(users, 5, 15).map(u => u.id);

        const epics = Array.from({length: EPICS_PER_PROJECT}, (_, epicId) => ({
            id: epicId,
            title: randPhrase(),
            description: randParagraph(),
            status: getRandomItem(['New', 'In Progress', 'Done']),
            startDate: randPastDate().toISOString(),
            targetDate: randFutureDate().toISOString(),
            projectId: id,
            projectName: randWord(),
            projectKey: `PROJ-${id}`,
            tasks: [],
            tasksCount: 0,
            completedTasksCount: 0,
            progress: randNumber({min: 0, max: 100}),
            owner: getRandomItem(team),
            ownerName: users.find(u => u.id === owner)?.name,
            ownerAvatar: users.find(u => u.id === owner)?.avatar,
            priority: getRandomItem(priorityOptions),
            priorityOrder: priorityOptions.indexOf(getRandomItem(priorityOptions)),
            createdAt: randPastDate().toISOString(),
            updatedAt: randRecentDate().toISOString(),
            order: epicId,
            key: `EPIC-${epicId}`,
            customFields: generateCustomFields('Epic'),
            isDeleted: false,
            dependencies: []
        }));

        return {
            id,
            name: randWord(),
            description: randParagraph(),
            key: `PROJ-${id}`,
            visibility: getRandomItem(visibilityOptions),
            category: getRandomItem(['Development', 'Marketing', 'Design', 'Research']),
            department: randDepartment(),
            status: getRandomItem(['Active', 'On Hold', 'Completed', 'Archived']),
            createdAt: randPastDate().toISOString(),
            updatedAt: randRecentDate().toISOString(),
            startDate: randPastDate().toISOString(),
            endDate: randFutureDate().toISOString(),
            owner,
            ownerName: users.find(u => u.id === owner)?.name,
            ownerAvatar: users.find(u => u.id === owner)?.avatar,
            team,
            teamMembers: team.map(userId => {
                const user = users.find(u => u.id === userId);
                return {
                    id: userId,
                    name: user?.name || '',
                    avatar: user?.avatar || '',
                    role: randJobTitle(),
                    joinedAt: randPastDate().toISOString(),
                    lastActiveAt: randRecentDate().toISOString()
                };
            }),
            epics,
            epicsCount: epics.length,
            completedEpicsCount: epics.filter(e => e.status === 'Done').length,
            sprints: [],
            sprintsCount: 0,
            completedSprintsCount: 0,
            tasks: [],
            tasksCount: 0,
            completedTasksCount: 0,
            tags: Array.from({length: 5}, () => randWord()),
            customFields: generateCustomFields('Project'),
            settings: {
                defaultAssignee: getRandomItem(team),
                defaultPriority: getRandomItem(priorityOptions),
                allowSubtasks: randBoolean(),
                requireEstimates: randBoolean(),
                workingDays: Array(7).fill(true),
                workingHours: {start: '09:00', end: '17:00'},
                timeZone: getRandomItem(timeZones),
                dateFormat: 'YYYY-MM-DD',
                timeFormat: '24h'
            },
            metrics: {
                totalTasks: 0,
                completedTasks: 0,
                overdueCards: 0,
                averageCycleTime: randNumber({min: 1, max: 20}),
                sprintVelocity: Array.from({length: 5}, () => randNumber({min: 10, max: 30})),
                taskDistribution: {
                    Backlog: 0,
                    Todo: 0,
                    'In Progress': 0,
                    'In Review': 0,
                    Done: 0,
                    Archived: 0
                },
                memberPerformance: Object.fromEntries(
                    team.map(userId => [userId, generateTaskMetrics()])
                )
            },
            budget: {
                allocated: randNumber({min: 50000, max: 500000}),
                spent: randNumber({min: 10000, max: 200000}),
                remaining: randNumber({min: 0, max: 100000}),
                currency: randCurrencyCode(),
                lastUpdated: randRecentDate().toISOString(),
                breakdown: generateBudgetBreakdown()
            },
            milestones: Array.from({length: 3}, (_, milestoneId) => ({
                id: milestoneId,
                name: randPhrase(),
                description: randParagraph(),
                dueDate: randFutureDate().toISOString(),
                status: getRandomItem(['Not Started', 'In Progress', 'Completed', 'Delayed']),
                progress: randNumber({min: 0, max: 100}),
                tasks: [],
                dependencies: [],
                owner: getRandomItem(team),
                budget: randNumber({min: 5000, max: 50000}),
                actualCost: randNumber({min: 1000, max: 60000}),
                createdAt: randPastDate().toISOString(),
                updatedAt: randRecentDate().toISOString(),
                isDeleted: false
            })),
            risks: Array.from({length: 3}, (_, riskId) => ({
                id: riskId,
                description: randParagraph(),
                probability: getRandomItem(['Low', 'Medium', 'High']),
                impact: getRandomItem(['Low', 'Medium', 'High']),
                mitigationPlan: randParagraph(),
                status: getRandomItem(['Open', 'Mitigated', 'Closed']),
                owner: getRandomItem(team),
                createdAt: randPastDate().toISOString(),
                updatedAt: randRecentDate().toISOString()
            })),
            customStatuses: Array.from({length: 5}, () => generateTaskCustomStatus()),
            integrations: Array.from({length: 2}, (_, integrationId) => ({
                id: integrationId,
                type: getRandomItem(['GitHub', 'Slack', 'Jira']),
                config: {
                    url: randUrl(),
                    token: randUuid(),
                    options: {
                        syncInterval: randNumber({min: 5, max: 60}),
                        enabled: randBoolean(),
                        syncFields: ['status', 'assignee', 'comments']
                    }
                },
                status: getRandomItem(['Active', 'Inactive']),
                lastSyncAt: randRecentDate().toISOString(),
                errors: []
            })),
            automations: Array.from({length: 2}, (_, automationId) => ({
                id: automationId,
                name: randPhrase(),
                description: randParagraph(),
                trigger: {
                    type: 'status_change',
                    conditions: [{
                        field: 'status',
                        operator: 'equals',
                        value: 'Done'
                    }]
                },
                actions: [{
                    type: 'notification',
                    config: {
                        notification: {
                            users: getRandomSubset(team, 1, 3),
                            message: randPhrase()
                        }
                    }
                }],
                isActive: randBoolean(),
                createdBy: getRandomItem(team),
                updatedAt: randRecentDate().toISOString(),
                lastRunAt: randRecentDate().toISOString(),
                runCount: randNumber({min: 0, max: 100})
            })),
            isTemplate: false,
            isDeleted: false,
            deletedAt: null,
            deletedBy: null
        };
    });

    // Generate Tasks
    const tasks: Task[] = [];
    projects.forEach(project => {
        Array.from({length: TASKS_PER_PROJECT}).forEach((_, idx) => {
            const taskId = tasks.length;
            const assigneeId = getRandomItem(project.team);
            const reporterId = getRandomItem(project.team);
            const status = getRandomItem(statusOptions);
            const epic = getRandomItem(project.epics);

            const taskComments = Array.from({length: COMMENTS_PER_TASK}, (_, commentId) => {
                const userId = getRandomItem(project.team);
                const childCommentIds = Array.from(
                    {length: CHILD_COMMENTS_PER_COMMENT},
                    () => randNumber({min: 1000, max: 2000})
                );

                const comment: Comment = {
                    id: commentId,
                    taskId,
                    userId,
                    userName: users.find(u => u.id === userId)?.name,
                    userAvatar: users.find(u => u.id === userId)?.avatar,
                    content: randParagraph(),
                    createdAt: randPastDate().toISOString(),
                    updatedAt: randRecentDate().toISOString(),
                    mentions: getRandomSubset(project.team, 0, 3),
                    attachments: getRandomSubset(attachments, 0, 2),
                    reactions: Array.from({length: randNumber({min: 0, max: 5})}, () => ({
                        id: randNumber({min: 1, max: 1000}),
                        emoji: randEmoji(),
                        userId: getRandomItem(project.team),
                        userName: users.find(u => u.id === getRandomItem(project.team))?.name,
                        createdAt: randRecentDate().toISOString()
                    })),
                    isEdited: randBoolean(),
                    isDeleted: false,
                    childComments: childCommentIds,
                    parentCommentId: undefined
                };
                return comment;
            });
            const taskAttachments = getRandomSubset(attachments, 1, ATTACHMENTS_PER_TASK);
            const watchers = getRandomSubset(project.team, 1, 5);

            const task = {
                id: taskId,
                title: randPhrase(),
                description: randParagraph(),
                status,
                statusOrder: statusOptions.indexOf(status),
                priority: getRandomItem(priorityOptions),
                priorityOrder: priorityOptions.indexOf(getRandomItem(priorityOptions)),
                type: getRandomItem(taskTypeOptions),
                createdAt: randPastDate().toISOString(),
                updatedAt: randRecentDate().toISOString(),
                dueDate: randFutureDate().toISOString(),
                dueTime: '17:00',
                estimatedHours: randNumber({min: 1, max: 40}),
                actualHours: randNumber({min: 1, max: 40}),
                assigneeId,
                assigneeName: users.find(u => u.id === assigneeId)?.name,
                assigneeAvatar: users.find(u => u.id === assigneeId)?.avatar,
                reporterId,
                reporterName: users.find(u => u.id === reporterId)?.name,
                reporterAvatar: users.find(u => u.id === reporterId)?.avatar,
                projectId: project.id,
                projectName: project.name,
                projectKey: project.key,
                sprintId: randNumber({min: 1, max: 10}),
                sprintName: `Sprint ${randNumber({min: 1, max: 10})}`,
                epicId: epic.id,
                epicName: epic.title,
                parentTaskId: null,
                parentTaskKey: null,
                subtasks: [],
                subTasksCount: 0,
                completedSubTasksCount: 0,
                tags: getRandomSubset(project.tags),
                attachments: taskAttachments,
                attachmentsCount: taskAttachments.length,
                comments: taskComments,
                commentsCount: taskComments.length,
                watchers,
                watchersCount: watchers.length,
                blockedBy: [],
                blocks: [],
                isBlocked: false,
                progress: randNumber({min: 0, max: 100}),
                customFields: generateCustomFields('Task'),
                storyPoints: randNumber({min: 1, max: 13}),
                originalEstimate: randNumber({min: 1, max: 100}),
                remainingEstimate: randNumber({min: 0, max: 100}),
                environment: getRandomItem(['Development', 'Staging', 'Production']),
                version: `v${randNumber({min: 1, max: 5})}.${randNumber({min: 0, max: 9})}`,
                dependencies: [],
                linkedTasks: [],
                activity: Array.from({length: 5}, () => ({
                    date: randRecentDate().toISOString(),
                    userId: getRandomItem(project.team),
                    userName: users.find(u => u.id === getRandomItem(project.team))?.name,
                    action: getRandomItem(['created', 'updated', 'commented', 'status_changed', 'assigned']),
                    details: {
                        field: randWord(),
                        oldValue: randWord(),
                        newValue: randWord(),
                        comment: randPhrase()
                    }
                })),
                labels: Array.from({length: 3}, () => randWord()),
                startDate: randPastDate().toISOString(),
                completedAt: randRecentDate().toISOString(),
                estimatedCompletionDate: randFutureDate().toISOString(),
                weight: randNumber({min: 1, max: 10}),
                order: idx,
                key: `${project.key}-${taskId}`,
                timeZone: getRandomItem(timeZones),
                lastViewedAt: randRecentDate().toISOString(),
                subscribedUsers: getRandomSubset(project.team),
                isFlagged: randBoolean(),
                isStarred: randBoolean(),
                reminderSet: randBoolean(),
                reminderTime: randFutureDate().toISOString(),
                isRecurring: randBoolean(),
                recurringPattern: generateRecurringPattern(),
                customStatus: generateTaskCustomStatus(),
                isDeleted: false,
                deletedAt: null,
                deletedBy: null
            };

            // Update epic metrics
            // @ts-expect-error - epic is not defined
            epic.tasks.push(taskId);
            epic.tasksCount++;
            if (task.status === 'Done') {
                epic.completedTasksCount++;
            }
            // @ts-expect-error - epic is not defined
            tasks.push(task);
            // @ts-expect-error - epic is not defined
            project.tasks.push(taskId);
            project.tasksCount++;
            if (status === 'Done') {
                project.completedTasksCount++;
            }
            project.metrics.taskDistribution[status]++;
        });
    });

    // Generate and connect sprint data
    const sprints = projects.flatMap(project =>
        Array.from({length: 3}, (_, id) => ({
            id,
            name: `Sprint ${id + 1}`,
            goal: randPhrase(),
            startDate: randPastDate().toISOString(),
            endDate: randFutureDate().toISOString(),
            status: getRandomItem(['Planning', 'Active', 'Completed', 'Cancelled']),
            projectId: project.id,
            projectName: project.name,
            projectKey: project.key,
            tasks: getRandomSubset(project.tasks, 5, 15),
            tasksCount: 0,
            completedTasksCount: 0,
            createdAt: randPastDate().toISOString(),
            createdBy: project.owner,
            createdByName: users.find(u => u.id === project.owner)?.name,
            updatedAt: randRecentDate().toISOString(),
            order: id,
            isDeleted: false,
            metrics: {
                totalPoints: randNumber({min: 20, max: 100}),
                completedPoints: randNumber({min: 0, max: 80}),
                velocity: randNumber({min: 10, max: 30}),
                taskDistribution: {
                    Backlog: randNumber({min: 0, max: 10}),
                    Todo: randNumber({min: 0, max: 10}),
                    'In Progress': randNumber({min: 0, max: 10}),
                    'In Review': randNumber({min: 0, max: 10}),
                    Done: randNumber({min: 0, max: 10}),
                    Archived: randNumber({min: 0, max: 5})
                },
                burndownData: Array.from({length: 10}, (_, i) => ({
                    date: randPastDate().toISOString(),
                    remainingPoints: randNumber({min: 0, max: 100 - i * 10})
                })),
                efficiency: randNumber({min: 0.6, max: 1}),
                scope_change: randNumber({min: -20, max: 20})
            }
        }))
    );

    return {
        users,
        projects,
        tasks,
        sprints,
        attachments
    };
};

export const mockData = generateFullMockData();