import React from 'react';
import { TaskItem, TaskStatus } from '@/types';
import { CommonCheckbox } from './CommonCheckbox';
import { CommonButton } from './CommonButton';
import { CommonBadge } from './CommonBadge';
import { CommonSelect } from './CommonSelect';
import { CheckCircle2, Eye, FileCheck, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStatusBadgeVariant } from '@/config/master.config';

export interface CommonTableViewProps {
  tasks: TaskItem[];
  selectedTaskIds: string[];
  onToggleTask: (id: string) => void;
  onSelectAllCategory: (ids: string[]) => void;
  onClearSelection: () => void;
  onActionClick: (task: TaskItem, actionType: 'proof_read' | 'review' | 'approve') => void;
  onBatchAction: (actionType: 'proof_read' | 'review' | 'submit') => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  categoryFilter?: string;
  onCategoryFilterChange?: (cat: string) => void;
  availableCategories?: string[];
  className?: string;
}

export const CommonTableView: React.FC<CommonTableViewProps> = ({
  tasks,
  selectedTaskIds,
  onToggleTask,
  onSelectAllCategory,
  onClearSelection,
  onActionClick,
  onBatchAction,
  searchQuery = '',
  onSearchChange,
  categoryFilter = 'All',
  onCategoryFilterChange,
  availableCategories = [],
  className,
}) => {
  // Filter tasks based on search and category
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.taskLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.taskDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.editorRole.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'All' || task.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Group tasks by "Category -> Subcategory"
  const groupedTasks = filteredTasks.reduce<Record<string, TaskItem[]>>((acc, task) => {
    const groupKey = `${task.category} -> ${task.subCategory}`;
    if (!acc[groupKey]) acc[groupKey] = [];
    acc[groupKey].push(task);
    return acc;
  }, {});

  const groupKeys = Object.keys(groupedTasks);


  return (
    <div className={cn('w-full flex flex-col gap-4', className)}>
      {/* Top Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks, roles, authors..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
          />
        </div>

        {availableCategories.length > 0 && onCategoryFilterChange && (
          <div className="w-52">
            <CommonSelect
              value={categoryFilter}
              onChange={(e) => onCategoryFilterChange(e.target.value)}
              options={['All', ...availableCategories].map((c) => ({
                value: c,
                label: c === 'All' ? 'All Categories' : c,
              }))}
              leftIcon={<Filter className="w-3.5 h-3.5" />}
              className="py-1.5 text-xs font-semibold bg-slate-50 border-slate-200"
            />
          </div>
        )}
      </div>

      {/* Main Table Groups */}
      {groupKeys.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto flex items-center justify-center text-slate-400 mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-bold text-slate-800">No tasks found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            No listing matched your filter criteria. Try adjusting your search query or selecting a different category.
          </p>
        </div>
      ) : (
        groupKeys.map((groupTitle) => {
          const groupItems = groupedTasks[groupTitle];
          const groupItemIds = groupItems.map((i) => i.id);
          const isAllGroupSelected = groupItemIds.every((id) =>
            selectedTaskIds.includes(id)
          );
          const isSomeGroupSelected =
            groupItemIds.some((id) => selectedTaskIds.includes(id)) &&
            !isAllGroupSelected;

          return (
            <div
              key={groupTitle}
              className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden"
            >
              {/* Group Header matching wireframe "Category 1 -> Subcategory 1" */}
              <div className="bg-slate-50/90 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CommonCheckbox
                    checked={isAllGroupSelected || isSomeGroupSelected}
                    onChange={() => onSelectAllCategory(groupItemIds)}
                    label={
                      <span className="font-extrabold text-slate-900 text-sm tracking-wide">
                        {groupTitle}
                      </span>
                    }
                  />
                  <CommonBadge variant="default" className="text-[11px] font-semibold">
                    {groupItems.length} items
                  </CommonBadge>
                </div>
                <span className="text-xs text-slate-500 font-medium hidden sm:inline">
                  (These rows can be selected for batch operations)
                </span>
              </div>

              {/* Table Container */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/50 text-[11px] uppercase tracking-wider font-extrabold text-slate-500">
                      <th className="py-2.5 px-4 w-12 text-center">Select</th>
                      <th className="py-2.5 px-4 font-bold text-slate-700 min-w-[180px]">
                        Task Label
                      </th>
                      <th className="py-2.5 px-4 font-bold text-slate-700 min-w-[130px]">
                        Editor-Role
                      </th>
                      <th className="py-2.5 px-4 font-bold text-slate-700 min-w-[140px]">
                        Name
                      </th>
                      <th className="py-2.5 px-4 font-bold text-slate-700 min-w-[240px]">
                        Task Desc.
                      </th>
                      <th className="py-2.5 px-4 font-bold text-slate-700 min-w-[110px]">
                        Status
                      </th>
                      <th className="py-2.5 px-4 text-center font-bold text-slate-700 min-w-[250px]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {groupItems.map((task, idx) => {
                      const isSelected = selectedTaskIds.includes(task.id);
                      return (
                        <tr
                          key={task.id}
                          className={cn(
                            'transition-colors hover:bg-blue-50/30',
                            isSelected && 'bg-blue-50/50',
                            idx % 2 === 1 ? 'bg-slate-50/20' : 'bg-white'
                          )}
                        >
                          {/* Selection Checkbox */}
                          <td className="py-3 px-4 text-center">
                            <CommonCheckbox
                              checked={isSelected}
                              onChange={() => onToggleTask(task.id)}
                            />
                          </td>

                          {/* Task Label */}
                          <td className="py-3 px-4 font-bold text-slate-900">
                            <div className="flex items-center gap-2">
                              <span>{task.taskLabel}</span>
                              {task.priority === 'High' && (
                                <span className="w-2 h-2 rounded-full bg-rose-500 flex-shrink-0" title="High Priority" />
                              )}
                            </div>
                          </td>

                          {/* Editor Role */}
                          <td className="py-3 px-4 font-medium text-slate-700">
                            <span className="inline-block bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs font-semibold">
                              {task.editorRole}
                            </span>
                          </td>

                          {/* Author Name */}
                          <td className="py-3 px-4 font-medium text-slate-800">
                            {task.name}
                          </td>

                          {/* Task Description */}
                          <td className="py-3 px-4 text-slate-600 text-xs sm:text-sm max-w-xs leading-relaxed">
                            {task.taskDesc}
                          </td>

                          {/* Status */}
                          <td className="py-3 px-4">
                            <CommonBadge variant={getStatusBadgeVariant(task.status)}>
                              {task.status}
                            </CommonBadge>
                          </td>

                          {/* Action Buttons matching wireframe: [Proof Read] [Review] [Approve/Submit] */}
                          <td className="py-3 px-4 text-center">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => onActionClick(task, 'proof_read')}
                                className="px-2.5 py-1 text-xs font-semibold rounded bg-sky-50 text-sky-700 border border-sky-200 hover:bg-sky-100 transition-colors inline-flex items-center gap-1"
                                title="Proof Read Task"
                              >
                                <Eye className="w-3 h-3" />
                                Proof Read
                              </button>
                              <button
                                type="button"
                                onClick={() => onActionClick(task, 'review')}
                                className="px-2.5 py-1 text-xs font-semibold rounded bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors inline-flex items-center gap-1"
                                title="Review Task"
                              >
                                <FileCheck className="w-3 h-3" />
                                Review
                              </button>
                              <button
                                type="button"
                                onClick={() => onActionClick(task, 'approve')}
                                className="px-2.5 py-1 text-xs font-semibold rounded bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors inline-flex items-center gap-1"
                                title="Approve / Submit Task"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                Approve
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      )}

      {/* Bottom Batch Actions Bar matching wireframe: [Proof Read] [Review] [Submit] */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Batch Actions:
          </span>
          <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
            {selectedTaskIds.length} row(s) selected
          </span>
          {selectedTaskIds.length > 0 && (
            <button
              type="button"
              onClick={onClearSelection}
              className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
            >
              Clear Selection
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <CommonButton
            variant="outline"
            size="sm"
            disabled={selectedTaskIds.length === 0}
            onClick={() => onBatchAction('proof_read')}
            leftIcon={<Eye className="w-4 h-4" />}
          >
            Proof Read
          </CommonButton>

          <CommonButton
            variant="secondary"
            size="sm"
            disabled={selectedTaskIds.length === 0}
            onClick={() => onBatchAction('review')}
            leftIcon={<FileCheck className="w-4 h-4" />}
          >
            Review
          </CommonButton>

          <CommonButton
            variant="primary"
            size="sm"
            disabled={selectedTaskIds.length === 0}
            onClick={() => onBatchAction('submit')}
            leftIcon={<CheckCircle2 className="w-4 h-4" />}
          >
            Submit
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default CommonTableView;
