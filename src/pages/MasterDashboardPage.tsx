import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/redux-hooks';
import {
  toggleTaskSelection,
  selectAllCategoryTasks,
  clearSelection,
  updateTaskStatus,
  batchUpdateStatus,
  setActiveMenuTab,
  setSearchQuery,
  setSelectedCategory,
} from '@/store/slice/masterSlice';
import {
  MENU_TABS,
  CATEGORIES,
  BRAND_CONFIG,
  getRoleInfo,
} from '@/config/master.config';
import AdminPanelLayout from '@/components/admin-panel/AdminPanelLayout';
import CommonTableView from '@/components/common/CommonTableView';
import CommonModal from '@/components/common/CommonModal';
import CommonButton from '@/components/common/CommonButton';
import CommonBadge from '@/components/common/CommonBadge';
import { TaskItem, TaskStatus, MasterRole } from '@/types';
import { CheckCircle2, Eye, FileCheck, Shield, Sparkles } from 'lucide-react';

export const MasterDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    tasks,
    selectedTaskIds,
    activeMenuTab,
    searchQuery,
    selectedCategory,
  } = useAppSelector((state) => state.master);
  const { selectedRole } = useAppSelector((state) => state.auth);

  // Active Task for Modal (Proof Read or Review or Approve)
  const [modalTask, setModalTask] = useState<TaskItem | null>(null);
  const [modalMode, setModalMode] = useState<
    'proof_read' | 'review' | 'approve' | 'batch' | null
  >(null);
  const [batchActionType, setBatchActionType] = useState<TaskStatus | null>(null);

  const roleInfo = getRoleInfo(selectedRole as MasterRole);

  // Row Action Click
  const handleActionClick = (
    task: TaskItem,
    actionType: 'proof_read' | 'review' | 'approve'
  ) => {
    setModalTask(task);
    setModalMode(actionType);
  };

  // Confirm Single Action in Modal
  const handleConfirmSingleAction = (newStatus: TaskStatus) => {
    if (modalTask) {
      dispatch(updateTaskStatus({ id: modalTask.id, status: newStatus }));
    }
    setModalTask(null);
    setModalMode(null);
  };

  // Batch Action Click (triggered by bottom batch action bar)
  const handleBatchAction = (
    actionType: 'proof_read' | 'review' | 'submit'
  ) => {
    const statusMap: Record<string, TaskStatus> = {
      proof_read: 'Proof Read',
      review: 'In Review',
      submit: 'Submitted',
    };
    setBatchActionType(statusMap[actionType]);
    setModalMode('batch');
  };

  // Confirm Batch Action
  const handleConfirmBatchAction = () => {
    if (batchActionType) {
      dispatch(
        batchUpdateStatus({
          ids: selectedTaskIds,
          status: batchActionType,
        })
      );
    }
    setModalMode(null);
    setBatchActionType(null);
  };

  return (
    <AdminPanelLayout>
      {/* =========================================================================
          Top Section Header
          ========================================================================= */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Master Panel Post-Login
            </h1>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Active Session
            </span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Cohort listing, multi-role review streams, and administrative approval pipeline.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <CommonBadge
            variant={roleInfo.badgeVariant}
            className="text-xs font-bold px-3 py-1 flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Authority: {selectedRole}</span>
          </CommonBadge>
        </div>
      </div>

      {/* =========================================================================
          Top Tabs matching Wireframe 2:
          [ Menu 1 ] [ Menu 2 ] [ Menu 3 ] [ Menu 4 ] [ Menu 5 ] [ Menu 6 ]
          ========================================================================= */}
      <div className="bg-white p-2 rounded-xl border border-slate-200/90 shadow-2xs overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-max">
          {MENU_TABS.map((tab) => {
            const isActive = activeMenuTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => dispatch(setActiveMenuTab(tab))}
                style={
                  isActive
                    ? { backgroundColor: 'var(--brand-primary)', borderRadius: 'var(--brand-radius, 0.5rem)' }
                    : { borderRadius: 'var(--brand-radius, 0.5rem)' }
                }
                className={`px-4 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? 'text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          Main Grouped Listing & Table View matching Wireframe 2
          - Category 1 -> Subcategory 1
          - Category 2 -> Subcategory 2
          - Category 3 -> Subcategory 3
          - Checkbox selection & Actions: [Proof Read] [Review] [Approve]
          - Bottom Batch Actions: [Proof Read] [Review] [Submit]
          ========================================================================= */}
      <div>
        <CommonTableView
          tasks={tasks}
          selectedTaskIds={selectedTaskIds}
          onToggleTask={(id) => dispatch(toggleTaskSelection(id))}
          onSelectAllCategory={(ids) => dispatch(selectAllCategoryTasks(ids))}
          onClearSelection={() => dispatch(clearSelection())}
          onActionClick={handleActionClick}
          onBatchAction={handleBatchAction}
          searchQuery={searchQuery}
          onSearchChange={(q) => dispatch(setSearchQuery(q))}
          categoryFilter={selectedCategory}
          onCategoryFilterChange={(c) => dispatch(setSelectedCategory(c))}
          availableCategories={CATEGORIES}
        />
      </div>

      {/* =========================================================================
          Interactive Modal for Row Action (Proof Read / Review / Approve)
          ========================================================================= */}
      {modalTask && (
        <CommonModal
          isOpen={!!modalTask}
          onClose={() => {
            setModalTask(null);
            setModalMode(null);
          }}
          title={
            modalMode === 'proof_read'
              ? `Proof Read: ${modalTask.taskLabel}`
              : modalMode === 'review'
              ? `Review Details: ${modalTask.taskLabel}`
              : `Approve Submission: ${modalTask.taskLabel}`
          }
          description={`Author: ${modalTask.name} (${modalTask.editorRole}) | Section: ${modalTask.category} -> ${modalTask.subCategory}`}
          footer={
            <div className="flex items-center gap-2.5">
              <CommonButton
                variant="outline"
                size="sm"
                onClick={() => {
                  setModalTask(null);
                  setModalMode(null);
                }}
              >
                Cancel
              </CommonButton>

              {modalMode === 'proof_read' && (
                <CommonButton
                  variant="primary"
                  size="sm"
                  onClick={() => handleConfirmSingleAction('Proof Read')}
                  leftIcon={<Eye className="w-4 h-4" />}
                >
                  Mark Proof Read
                </CommonButton>
              )}

              {modalMode === 'review' && (
                <CommonButton
                  variant="primary"
                  size="sm"
                  onClick={() => handleConfirmSingleAction('In Review')}
                  leftIcon={<FileCheck className="w-4 h-4" />}
                >
                  Confirm Review Status
                </CommonButton>
              )}

              {modalMode === 'approve' && (
                <CommonButton
                  variant="success"
                  size="sm"
                  onClick={() => handleConfirmSingleAction('Approved')}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  Approve Task
                </CommonButton>
              )}
            </div>
          }
        >
          <div className="space-y-4 text-sm">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Task Description & Verification Objective:
              </span>
              <p className="text-slate-800 leading-relaxed font-medium">
                {modalTask.taskDesc}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-semibold block">Current Status:</span>
                <span className="font-bold text-slate-900 mt-1 block">
                  {modalTask.status}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-semibold block">Last Synchronized:</span>
                <span className="font-bold text-slate-900 mt-1 block">
                  {modalTask.updatedAt}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Confirming this action will update the governance record across the Master Panel audit logs and inform the author cohort.
            </p>
          </div>
        </CommonModal>
      )}

      {/* =========================================================================
          Batch Action Modal (Multi-Row Selection)
          ========================================================================= */}
      {modalMode === 'batch' && batchActionType && (
        <CommonModal
          isOpen={true}
          onClose={() => setModalMode(null)}
          title={`Batch ${batchActionType} Confirmation`}
          description={`Apply status change to ${selectedTaskIds.length} selected row(s)?`}
          footer={
            <div className="flex items-center gap-2">
              <CommonButton
                variant="outline"
                size="sm"
                onClick={() => setModalMode(null)}
              >
                Cancel
              </CommonButton>
              <CommonButton
                variant="primary"
                size="sm"
                onClick={handleConfirmBatchAction}
              >
                Apply to All ({selectedTaskIds.length})
              </CommonButton>
            </div>
          }
        >
          <div className="space-y-3">
            <p className="text-sm text-slate-700 leading-relaxed">
              You have selected{' '}
              <strong className="text-slate-900 font-bold">{selectedTaskIds.length} task item(s)</strong>.
              Submitting will update their status to{' '}
              <strong className="text-blue-600 font-bold">"{batchActionType}"</strong> across all cohort streams.
            </p>
            <div className="max-h-40 overflow-y-auto space-y-1.5 p-2 bg-slate-50 rounded-lg border border-slate-200 text-xs">
              {tasks
                .filter((t) => selectedTaskIds.includes(t.id))
                .map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-1 px-2 bg-white rounded border border-slate-100">
                    <span className="font-bold text-slate-800">{t.taskLabel}</span>
                    <span className="text-slate-500 font-medium">{t.name}</span>
                  </div>
                ))}
            </div>
          </div>
        </CommonModal>
      )}
    </AdminPanelLayout>
  );
};

export default MasterDashboardPage;
