import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { Bell, CheckCheck } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { FlexColumn, FlexRow } from "@/components/common/Layouts";
import NoNotificationsAvailable from "@/components/NoDataAvailable/Notifications";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Skeleton from "@/components/ui/Skeleton";
import { formatDate } from "@/lib/index";
import isEmpty from "@/lib/isEmpty";
import {
  getNotificationCount,
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/services/ClientSide/common";
import { NotificationType } from "@/types/notifications";

const constructNotificationUrl = (notification: NotificationType) => {
  switch (notification.type) {
    case "leaderboard":
      return `/mock-test/${notification.meta?.mock_test_id}`;
    case "discussion":
      return `/mock-tests/${notification.meta?.mock_test_id}`;
    case "user":
      return `/profile/${notification.meta?.user_id}`;
    default:
      return "";
  }
};
const Notification = () => {
  const queryClient = useQueryClient();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filter, setFilter] = useState("all");

  const { data: notificationCount, refetch } = useQuery({
    queryKey: ["unread-notification-count"],
    queryFn: () => {
      return getNotificationCount();
    },
    select: ({ data }) => data?.count,
  });

  const { data: notificationsData, isLoading } = useQuery<
    AxiosResponse<NotificationType[]>,
    Error,
    NotificationType[]
  >({
    queryKey: ["notifications", filter],
    queryFn: () => {
      return getNotifications({
        filter,
      });
    },
    select: ({ data }) => data,
  });

  const hasUnreadNotifications = notificationsData?.some(
    (notification) => !notification?.is_read
  );

  const { mutate, isPending: notificationsIsUpdating } = useMutation({
    mutationFn: () => {
      return markAllNotificationsAsRead();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["unread-notification-count"],
      });
    },
    onError: (response) => {
      toast.error(
        response.message || "Failed to mark all notifications as read"
      );
    },
  });
  const {
    mutate: markNotificationAsReadFn,
    isPending: isNotificationUpdating,
  } = useMutation({
    mutationFn: (notificationId: number) => {
      return markNotificationAsRead(notificationId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notifications"],
      });
      queryClient.invalidateQueries({
        queryKey: ["unread-notification-count"],
      });
    },
    onError: (response) => {
      toast.error(
        response.message || "Failed to mark all notifications as read"
      );
    },
  });

  useEffect(() => {
    setInterval(() => {
      refetch();
    }, 300000);
  }, [refetch]);

  const notificationFilterOptions = [
    {
      id: "all",
      label: "All",
    },
    {
      id: "unread",
      label: "Unread",
    },
  ];

  return (
    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
      <DropdownMenuTrigger className="!flex !outline-none">
        <div className="relative">
          <Bell size={24} name="notifications" className="text-black-600" />
          {notificationCount > 0 && (
            <div className="absolute right-0 top-0 flex h-3 w-3 items-center justify-center rounded-full bg-red-500 p-1 outline outline-white">
              <p className="text-[0.5rem] font-medium text-white">
                {notificationCount}
              </p>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="!z-50 h-fit w-full overflow-hidden !rounded-lg bg-white !py-0 shadow-[0px_2px_20px_4px_rgba(0,0,0,0.12)] max-sm:!ml-3 max-sm:w-[18.5rem] sm:w-[22.5rem]"
      >
        <FlexColumn className="scrollbar max-h-[calc(100dvh-8rem)] w-full overflow-y-auto">
          <FlexColumn className="gap-2">
            <FlexRow className="text-neutral-gray items-center justify-between border-[#D7D7D7] px-3 py-2 shadow-sm">
              <p className="text-[1.125rem] font-bold">Notifications</p>
              <Button
                variant="ghost"
                className="text-primary-600 disabled:text-gray-400"
                disabled={!hasUnreadNotifications || notificationsIsUpdating}
                isLoading={notificationsIsUpdating}
                onClick={() => mutate()}
              >
                Mark all as Read
              </Button>
            </FlexRow>
            <FlexRow className="gap-2 px-2">
              {notificationFilterOptions.map((option) => (
                <Button
                  key={option.id}
                  variant="ghost"
                  className={`w-full text-left text-gray-700 transition-all duration-300 ease-in-out hover:bg-primary-100 ${
                    filter === option.id ? "bg-primary-100" : ""
                  }`}
                  onClick={() => {
                    setFilter(option.id);
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </FlexRow>
          </FlexColumn>
          {isLoading ? (
            <FlexColumn className="gap-1 px-2 py-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton className="h-10 w-full rounded-lg py-2" key={index} />
              ))}
            </FlexColumn>
          ) : isEmpty(notificationsData) ? (
            <NoNotificationsAvailable />
          ) : (
            notificationsData?.map((notification) => {
              return (
                <FlexColumn
                  key={notification?.id}
                  className={`w-full items-start gap-1 px-3 py-5`}
                >
                  <FlexRow className="items-start gap-1">
                    <Link
                      href={constructNotificationUrl(notification)}
                      className="w-full"
                      onClick={() => {
                        setIsDropdownOpen(false);
                      }}
                    >
                      <p className="text-neutral-gray text-md font-medium leading-5">
                        {notification?.message}
                      </p>
                    </Link>
                    {!notification.is_read && (
                      <button
                        disabled={isNotificationUpdating}
                        onClick={() =>
                          markNotificationAsReadFn(notification.id)
                        }
                        className="group"
                      >
                        <CheckCheck className="h-5 w-5 cursor-pointer group-disabled:text-gray-300 md:h-6 md:w-6" />
                      </button>
                    )}
                  </FlexRow>
                  <FlexRow className="w-full items-center justify-between">
                    <p className="text-black-600 text-sm font-normal leading-normal tracking-[-0.015rem]">
                      {formatDate(notification?.created_at)}
                    </p>
                    {!notification.is_read && (
                      <div className="h-3 w-3 rounded-full bg-primary-300" />
                    )}
                  </FlexRow>
                </FlexColumn>
              );
            })
          )}
        </FlexColumn>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Notification;
