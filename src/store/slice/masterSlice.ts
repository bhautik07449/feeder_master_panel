import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskItem, TaskStatus } from '@/types';

interface MasterState {
  tasks: TaskItem[];
  selectedTaskIds: string[];
  activeMenuTab: string;
  selectedCategory: string;
  selectedSubCategory: string;
  searchQuery: string;
}

const initialTasks: TaskItem[] = [
  // Category 1 -> Subcategory 1
  {
    id: 'tsk_101',
    taskLabel: 'Algorithmic Risk Variance v4',
    editorRole: 'Algorithmist',
    name: 'Sarah Connor',
    taskDesc: 'Statistical confidence boundaries for cross-asset index rebalancing',
    category: 'Category 1',
    subCategory: 'Subcategory 1',
    status: 'Pending',
    updatedAt: '10 mins ago',
    priority: 'High',
  },
  {
    id: 'tsk_102',
    taskLabel: 'Workflow Process Optimization',
    editorRole: 'Process Mapper',
    name: 'David Kim',
    taskDesc: 'Bottleneck clearance across Stage 2 multi-signature approvals',
    category: 'Category 1',
    subCategory: 'Subcategory 1',
    status: 'In Review',
    updatedAt: '25 mins ago',
    priority: 'Medium',
  },
  {
    id: 'tsk_103',
    taskLabel: 'Systemic Capital Estimations',
    editorRole: 'Estimator',
    name: 'Elena Rostova',
    taskDesc: 'Quarterly allocation bounds for institutional participant cohorts',
    category: 'Category 1',
    subCategory: 'Subcategory 1',
    status: 'Pending',
    updatedAt: '1 hour ago',
    priority: 'High',
  },
  // Category 2 -> Subcategory 2
  {
    id: 'tsk_201',
    taskLabel: 'Empirical Research Synthesis',
    editorRole: 'Researcher',
    name: 'Dr. Marcus Webb',
    taskDesc: 'Comparative study on regulatory yield requirements in G10 markets',
    category: 'Category 2',
    subCategory: 'Subcategory 2',
    status: 'Proof Read',
    updatedAt: '2 hours ago',
    priority: 'Medium',
  },
  {
    id: 'tsk_202',
    taskLabel: 'Taxonomy Infusion Layer',
    editorRole: 'Infuser',
    name: 'Aisha Patel',
    taskDesc: 'Harmonization of metadata tags across multi-institutional repositories',
    category: 'Category 2',
    subCategory: 'Subcategory 2',
    status: 'Pending',
    updatedAt: '3 hours ago',
    priority: 'Low',
  },
  // Category 3 -> Subcategory 3
  {
    id: 'tsk_301',
    taskLabel: 'Institutional Bulletin Publication',
    editorRole: 'Publisher',
    name: 'Julian Thorne',
    taskDesc: 'Final editorial release and cryptographic signing for bulletin #49',
    category: 'Category 3',
    subCategory: 'Subcategory 3',
    status: 'Approved',
    updatedAt: 'Yesterday',
    priority: 'High',
  },
  {
    id: 'tsk_302',
    taskLabel: 'Liquidity Matrix Parameter Setup',
    editorRole: 'Algorithmist',
    name: 'Wei Zhang',
    taskDesc: 'Validation of stress-test thresholds under volatility spike conditions',
    category: 'Category 3',
    subCategory: 'Subcategory 3',
    status: 'Pending',
    updatedAt: 'Yesterday',
    priority: 'Medium',
  },
];

const initialState: MasterState = {
  tasks: initialTasks,
  selectedTaskIds: [],
  activeMenuTab: 'Menu 1',
  selectedCategory: 'All',
  selectedSubCategory: 'All',
  searchQuery: '',
};

export const masterSlice = createSlice({
  name: 'master',
  initialState,
  reducers: {
    toggleTaskSelection: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.selectedTaskIds.includes(id)) {
        state.selectedTaskIds = state.selectedTaskIds.filter((tId) => tId !== id);
      } else {
        state.selectedTaskIds.push(id);
      }
    },
    selectAllCategoryTasks: (state, action: PayloadAction<string[]>) => {
      const ids = action.payload;
      const allSelected = ids.every((id) => state.selectedTaskIds.includes(id));
      if (allSelected) {
        state.selectedTaskIds = state.selectedTaskIds.filter((id) => !ids.includes(id));
      } else {
        state.selectedTaskIds = Array.from(new Set([...state.selectedTaskIds, ...ids]));
      }
    },
    clearSelection: (state) => {
      state.selectedTaskIds = [];
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
      }
    },
    batchUpdateStatus: (state, action: PayloadAction<{ ids: string[]; status: TaskStatus }>) => {
      const { ids, status } = action.payload;
      state.tasks.forEach((t) => {
        if (ids.includes(t.id)) {
          t.status = status;
        }
      });
      state.selectedTaskIds = [];
    },
    setActiveMenuTab: (state, action: PayloadAction<string>) => {
      state.activeMenuTab = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
});

export const {
  toggleTaskSelection,
  selectAllCategoryTasks,
  clearSelection,
  updateTaskStatus,
  batchUpdateStatus,
  setActiveMenuTab,
  setSearchQuery,
  setSelectedCategory,
} = masterSlice.actions;

export default masterSlice.reducer;
