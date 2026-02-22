import { BadgeInfo, Clock, FileText, Hash, Minus, Plus } from "lucide-react";
import React, { useState } from "react";

import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import Modal from "@/components/common/Modal";
import { Button } from "@/components/ui/button";

import { useMCQContext } from "../Context/MCQContext";

const InfoView = () => {
  const { mcqData } = useMCQContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins} minutes`;
  };

  return (
    <>
      <div className="absolute left-4 top-4 z-50">
        <Button
          className="!rounded-full !p-2"
          onClick={() => setIsModalOpen(true)}
        >
          <BadgeInfo className="size-6" />
        </Button>
      </div>

      <Modal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Test Information"
      >
        <FlexColumn className="gap-6 p-4">
          {/* Test Title */}
          <div className="text-center border-b pb-4">
            <h2 className="text-xl font-bold text-primary-700">
              {mcqData?.title}
            </h2>
          </div>

          {/* Test Overview */}
          <FlexColumn className="gap-4">
            <h3 className="text-lg font-semibold text-primary-600 flex items-center gap-2">
              <FileText className="size-5" />
              Test Overview
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FlexRow className="items-center gap-3 p-3 bg-primary-50 rounded-lg border border-primary-100">
                <Hash className="size-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Questions</p>
                  <p className="font-semibold text-primary-700">
                    {mcqData?.questions_count}
                  </p>
                </div>
              </FlexRow>

              <FlexRow className="items-center gap-3 p-3 bg-primary-50 rounded-lg border border-primary-100">
                <Clock className="size-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-600">Time Limit</p>
                  <p className="font-semibold text-primary-700">
                    {formatTime(mcqData?.time_limit || 0)}
                  </p>
                </div>
              </FlexRow>
            </div>

            {/* Show marking scheme for single section tests */}
            {mcqData?.sections?.length === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FlexRow className="items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <Plus className="size-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Marks per Question</p>
                    <p className="font-semibold text-green-700">
                      +{mcqData.sections[0].marks_per_question}
                    </p>
                  </div>
                </FlexRow>

                <FlexRow className="items-center gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                  <Minus className="size-5 text-red-600" />
                  <div>
                    <p className="text-sm text-gray-600">Negative Marking</p>
                    <p className="font-semibold text-red-700">
                      -{mcqData.sections[0].negative_marking}
                    </p>
                  </div>
                </FlexRow>
              </div>
            )}
          </FlexColumn>

          {/* Sections Information - Only show for multiple sections */}
          {mcqData?.sections?.length > 1 && (
            <FlexColumn className="gap-4">
              <h3 className="text-lg font-semibold text-primary-600">
                Section Details
              </h3>

              <div className="space-y-3">
                {mcqData.sections.map((section, index) => (
                  <div
                    key={section.section_id}
                    className="border border-primary-100 rounded-lg p-4 bg-primary-25"
                  >
                    <FlexRow className="items-center justify-between mb-3">
                      <h4 className="font-medium text-primary-800">
                        {section.name}
                      </h4>
                      <span className="text-sm text-primary-500 bg-primary-100 px-2 py-1 rounded">
                        Section {index + 1}
                      </span>
                    </FlexRow>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                      <FlexRow className="items-center gap-2">
                        <Hash className="size-4 text-primary-500" />
                        <span className="text-gray-600">Questions:</span>
                        <span className="font-medium text-primary-700">
                          {section.question_count}
                        </span>
                      </FlexRow>

                      <FlexRow className="items-center gap-2">
                        <Plus className="size-4 text-green-500" />
                        <span className="text-gray-600">Marks:</span>
                        <span className="font-medium text-green-600">
                          +{section.marks_per_question}
                        </span>
                      </FlexRow>

                      <FlexRow className="items-center gap-2">
                        <Minus className="size-4 text-red-500" />
                        <span className="text-gray-600">Negative:</span>
                        <span className="font-medium text-red-600">
                          -{section.negative_marking}
                        </span>
                      </FlexRow>
                    </div>
                  </div>
                ))}
              </div>
            </FlexColumn>
          )}

          {/* Summary */}
          <div className="border-t border-primary-100 pt-4">
            <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg p-4 border border-primary-200">
              <h4 className="font-medium text-primary-800 mb-2">
                Test Summary
              </h4>
              <p className="text-sm text-primary-700">
                Complete all {mcqData?.questions_count} questions
                {mcqData?.sections?.length > 1 && (
                  <> across {mcqData.sections.length} sections</>
                )}{" "}
                within {formatTime(mcqData?.time_limit || 0)}.
                {mcqData?.sections?.length > 1
                  ? " Each section has different marking schemes."
                  : ""}
              </p>
            </div>
          </div>
        </FlexColumn>
      </Modal>
    </>
  );
};

export default InfoView;
