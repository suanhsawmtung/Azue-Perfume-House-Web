import { baseImageUrl, currency } from "@/config/env";
import { csvFilenameFilterOrder } from "@/constants/csv.constant";
import type {
  OrderPaymentStatus,
  OrderSource,
  OrderStatus,
} from "@/types/order.type";
import type { PaymentStatus } from "@/types/payment.type";
import type { PostStatus } from "@/types/post.type";
import type { Concentration, Gender } from "@/types/product.type";
import type { RefundStatus } from "@/types/refund.type";
import type {
  TransactionDirection,
  TransactionTypeEnum,
} from "@/types/transaction.type";
import type { Role, Status } from "@/types/user.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatImagePath = (imagePath: string, folder: string) => {
  try {
    new URL(imagePath);
    return imagePath;
  } catch {
    return `${baseImageUrl}${folder}/${imagePath}`;
  }
};

// export function formatPrice(
//   price: number | string,
//   opts: Intl.NumberFormatOptions = {},
// ) {
//   return new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: opts.currency ?? currency,
//     notation: opts.notation ?? "compact",
//   }).format(Number(price));
// }

export const formatPrice = (price: number) => {
  return `${price.toLocaleString()} ${currency}`;
};

// Format user display name from AuthUser
// Returns firstName + lastName if available, otherwise username, email, or "User"
export function formatUserDisplayName(user: {
  firstName?: unknown;
  lastName?: unknown;
  username?: unknown;
  email?: string;
}): string {
  const firstName = user.firstName as string | undefined;
  const lastName = user.lastName as string | undefined;
  const username = user.username as string | undefined;

  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }

  return username || user.email || "User";
}

// Get user initials from AuthUser
// Returns first letter of firstName + lastName, or first letter of username/email, or "U"
export function getUserInitials(user: {
  firstName?: unknown;
  lastName?: unknown;
  username?: unknown;
  email?: string;
}): string {
  const firstName = user.firstName as string | undefined;
  const lastName = user.lastName as string | undefined;
  const username = user.username as string | undefined;
  const email = user.email;

  if (firstName && lastName) {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  }
  if (username) {
    return username[0].toUpperCase();
  }
  if (email) {
    return email[0].toUpperCase();
  }
  return "U";
}

// Format date and time as "Oct 22, 1998 08:30 AM"
export const formatDateTime = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(dateObj);
};

// Format date as "Oct 22, 1998"
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(dateObj);
};

// Type guard to validate if a string is a valid PostStatus
export function isPostStatus(
  value: string | null | undefined,
): value is PostStatus {
  return value === "DRAFT" || value === "PUBLISHED" || value === "ARCHIVED";
}

// Type guard to validate if a string is a valid RefundStatus
export function isRefundStatus(
  value: string | null | undefined,
): value is RefundStatus {
  return (
    value === "PENDING" ||
    value === "SUCCESS" ||
    value === "FAILED" ||
    value === "VOIDED"
  );
}

// Type guard to validate if a string is a valid PaymentStatus
export function isPaymentStatus(
  value: string | null | undefined,
): value is PaymentStatus {
  return (
    value === "PENDING" ||
    value === "SUCCESS" ||
    value === "FAILED" ||
    value === "VOIDED"
  );
}

// Type guard to validate if a string is a valid Status
export function isStatus(value: string | null | undefined): value is Status {
  return value === "ACTIVE" || value === "INACTIVE" || value === "FREEZE";
}

// Type guard to validate if a string is a valid Role
export function isRole(value: string | null | undefined): value is Role {
  return value === "USER" || value === "ADMIN" || value === "AUTHOR";
}

export function isReviewStatus(
  value: string | null | undefined,
): value is "publish" | "unpublish" {
  return value === "publish" || value === "unpublish";
}

export function isTransactionType(
  value: string | null | undefined,
): value is TransactionTypeEnum {
  return (
    value === "PAYMENT" ||
    value === "REFUND" ||
    value === "ADJUSTMENT" ||
    value === "EXPENSE" ||
    value === "WITHDRAWAL" ||
    value === "OTHER"
  );
}

export function isTransactionDirection(
  value: string | null | undefined,
): value is TransactionDirection {
  return value === "IN" || value === "OUT";
}

export function getPostStatusVariant(status: PostStatus) {
  return status === "DRAFT"
    ? "secondary"
    : status === "PUBLISHED"
      ? "default"
      : "destructive";
}

// Get user role variant for badge
export function getUserRoleVariant(role: Role) {
  return role === "ADMIN"
    ? "default"
    : role === "AUTHOR"
      ? "secondary"
      : "outline";
}

// Get user status variant for badge
export function getUserStatusVariant(status: Status) {
  return status === "ACTIVE"
    ? "default"
    : status === "INACTIVE"
      ? "secondary"
      : "destructive";
}

// Get order status variant for badge
export function getOrderStatusVariant(status: OrderStatus) {
  switch (status) {
    case "PENDING":
      return "secondary";
    case "ACCEPTED":
    case "SHIPPED":
    case "DELIVERED":
      return "default";
    case "REJECTED":
      return "destructive";
    case "CANCELLED":
    case "DONE":
      return "outline";
    default:
      return "secondary";
  }
}

// Get payment status variant for badge
export function getPaymentStatusVariant(
  status: OrderPaymentStatus | PaymentStatus,
) {
  switch (status) {
    case "UNPAID":
      return "default";
    case "PAID":
    case "PARTIALLY_PAID":
      return "secondary";
    case "SUCCESS":
      return "outline";
    case "FAILED":
    case "REFUNDED":
    case "PARTIALLY_REFUNDED":
    case "VOIDED":
      return "destructive";
    default:
      return "secondary";
  }
}

// Get order source variant for badge
export function getOrderSourceVariant(source: OrderSource) {
  return source === "ADMIN" ? "default" : "secondary";
}

// Get refund status variant for badge
export function getRefundStatusVariant(status: RefundStatus) {
  switch (status) {
    case "PENDING":
      return "secondary";
    case "SUCCESS":
      return "outline";
    case "FAILED":
    case "VOIDED":
      return "destructive";
    default:
      return "secondary";
  }
}

export function getTransactionTypeVariant(type: TransactionTypeEnum) {
  switch (type) {
    case "PAYMENT":
      return "outline";
    case "REFUND":
      return "destructive";
    case "EXPENSE":
      return "destructive";
    case "WITHDRAWAL":
      return "secondary";
    case "ADJUSTMENT":
      return "default";
    default:
      return "secondary";
  }
}

export const getOrderStatusColor = (status: string) => {
  switch (status.toUpperCase()) {
    case "DELIVERED":
    case "DONE":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "SHIPPED":
    case "ACCEPTED":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "PENDING":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "REJECTED":
    case "CANCELLED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-secondary text-muted-foreground";
  }
};

export function getTransactionDirectionVariant(
  direction: TransactionDirection,
) {
  return direction === "IN" ? "outline" : "destructive";
}

// Format name from firstName and lastName
// Returns "firstName lastName" if both exist, just firstName/lastName if one exists, or "-" if neither exists
export function formatName({
  firstName,
  lastName,
  username,
}: {
  firstName: string | null | undefined;
  lastName: string | null | undefined;
  username: string | null | undefined;
}): string {
  const first = firstName || "";
  const last = lastName || "";

  if (first && last) {
    return `${first} ${last}`;
  }
  if (first) {
    return first;
  }
  if (last) {
    return last;
  }
  return username || "-";
}

// Type guard to validate if a string is a valid Concentration
export function isConcentration(
  value: string | null | undefined,
): value is Concentration {
  return (
    value === "EDC" || value === "EDT" || value === "EDP" || value === "PARFUM"
  );
}

// Type guard to validate if a string is a valid Gender
export function isGender(value: string | null | undefined): value is Gender {
  return value === "MALE" || value === "FEMALE" || value === "UNISEX";
}

// Get concentration variant for badge
export function getConcentrationVariant(concentration: Concentration) {
  return concentration === "PARFUM"
    ? "default"
    : concentration === "EDP"
      ? "secondary"
      : concentration === "EDT"
        ? "outline"
        : "destructive";
}

// Get gender variant for badge
export function getGenderVariant(gender: Gender) {
  return gender === "MALE"
    ? "default"
    : gender === "FEMALE"
      ? "secondary"
      : "outline";
}

// Type guard to validate if a string is a valid OrderStatus
export function isOrderStatus(
  value: string | null | undefined,
): value is OrderStatus {
  return (
    value === "PENDING" ||
    value === "REJECTED" ||
    value === "ACCEPTED" ||
    value === "SHIPPED" ||
    value === "DELIVERED" ||
    value === "DONE" ||
    value === "CANCELLED"
  );
}

// Type guard to validate if a string is a valid PaymentStatus
export function isOrderPaymentStatus(
  value: string | null | undefined,
): value is OrderPaymentStatus {
  return (
    value === "PAID" ||
    value === "UNPAID" ||
    value === "FAILED" ||
    value === "REFUNDED" ||
    value === "PARTIALLY_REFUNDED" ||
    value === "PARTIALLY_PAID"
  );
}

export const isOrderSource = (
  value: string | null | undefined,
): value is OrderSource => {
  return value === "ADMIN" || value === "CUSTOMER";
};

export const getGrade = (points: number) => {
  if (points >= 4000) return "PLATINUM";
  if (points >= 1500) return "GOLD";
  if (points >= 500) return "SILVER";
  return "BRONZE";
};

export function getGradeVariant(grade: string) {
  switch (grade) {
    case "PLATINUM":
      return "default";
    case "GOLD":
      return "secondary";
    case "SILVER":
      return "outline";
    case "BRONZE":
      return "secondary";
    default:
      return "outline";
  }
}

export function parseBoolean(value: string | null) {
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

export function pluralize(count: number, singular: string, plural?: string) {
  if (count === 1) return singular;
  return plural ?? `${singular}s`;
}

export const toTitleCase = (str: string) =>
  str
    .split(" ")
    .map((word) => {
      if (!word) return "";
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");

export const getProductListPageHref = (gender: string | null) => {
  return gender === "MALE" || gender === "FEMALE"
    ? `/products?gender=${gender}`
    : `/products`;
};

export function getProductDetailDocumentTitle(
  name: string,
  size: number,
): string {
  return `${name} ${size} ml | Azue Perfume House`;
}

export function getProductListingDocumentTitle({
  brand,
  gender,
  concentration,
}: {
  brand?: string;
  gender?: Gender;
  concentration?: Concentration;
}): string {
  const parts: string[] = [];

  if (brand) {
    parts.push(toTitleCase(brand.split("-").join(" ")));
  }

  if (gender) {
    const genderText = {
      MALE: "Men's",
      FEMALE: "Women's",
      UNISEX: "Unisex",
    }[gender];

    parts.push(genderText);
  }

  if (concentration) {
    parts.push(concentration);
  }

  if (parts.length === 0) {
    return "Perfume Collections | Azue Perfume House";
  }

  return `${parts.join(" ")} Perfumes | Azue Perfume House`;
}

export function getMyReviewsDocumentTitle({
  status,
}: {
  status: "publish" | "unpublish" | undefined;
}) {
  if (status === "publish") {
    return "Published Reviews | Azue Perfume House";
  }
  if (status === "unpublish") {
    return "Pending Reviews | Azue Perfume House";
  }
  return "My Reviews | Azue Perfume House";
}

export function getMyOrdersDocumentTitle({
  condition,
}: {
  condition: "active" | "inactive" | undefined;
}) {
  if (condition === "active") {
    return "Active Orders | Azue Perfume House";
  }
  if (condition === "inactive") {
    return "Inactive Orders | Azue Perfume House";
  }
  return "My Orders | Azue Perfume House";
}

export const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export const getCurrentDateForCsvFileName = () => {
  const currentDate = new Date();

  return `${String(currentDate.getDate()).padStart(2, "0")}-${String(
    currentDate.getMonth() + 1,
  ).padStart(2, "0")}-${currentDate.getFullYear()}`;
};

const normalizeCsvFilenamePart = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const getCsvFilename = (
  moduleName: string,
  filterValues: Record<string, unknown> = {},
) => {
  const filterEntries = Object.entries(filterValues)
    .filter(([key, value]) => {
      if (["page", "limit", "offset"].includes(key)) return false;
      return value !== undefined && value !== null && value !== "";
    })
    .sort(([firstKey], [secondKey]) => {
      const firstIndex = csvFilenameFilterOrder.indexOf(firstKey);
      const secondIndex = csvFilenameFilterOrder.indexOf(secondKey);

      if (firstIndex === -1 && secondIndex === -1) {
        return firstKey.localeCompare(secondKey);
      }
      if (firstIndex === -1) return 1;
      if (secondIndex === -1) return -1;
      return firstIndex - secondIndex;
    });

  const filterParts = filterEntries.flatMap(([key, value]) => {
    const values = Array.isArray(value) ? value : [value];

    return values.flatMap((filterValue) => {
      if (typeof filterValue === "object" || filterValue === null) {
        return [];
      }

      let valueText = String(filterValue);
      if (key === "gender") {
        valueText =
          filterValue === "MALE"
            ? "men"
            : filterValue === "FEMALE"
              ? "women"
              : valueText;
      }
      if (typeof filterValue === "boolean") {
        if (key === "isActive") valueText = filterValue ? "active" : "inactive";
        if (key === "isLimited")
          valueText = filterValue ? "limited" : "not-limited";
      }

      const normalizedValue = normalizeCsvFilenamePart(valueText);
      return normalizedValue ? [normalizedValue] : [];
    });
  });

  const normalizedModuleName = normalizeCsvFilenamePart(moduleName);
  return (
    [getCurrentDateForCsvFileName(), ...filterParts, normalizedModuleName]
      .filter(Boolean)
      .join("-") + ".csv"
  );
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
