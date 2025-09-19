import { Prisma } from '@prisma/client';

type Primitive = string | number | boolean | bigint | symbol | null | undefined | Date;

// export type RecursiveOptional<T> = {
//   [P in keyof T]: T[P] extends Primitive
//     ? T[P] // keep primitive required
//     : T[P] extends (infer U)[] // if it's an array
//       ? RecursiveOptional<U>[] | null | undefined // make array itself optional, recurse on elements
//       : RecursiveOptional<T[P]> | null | undefined; // object → optional
// };

// export type RecursiveOptional<T> = {
//   [P in keyof T]: T[P] extends Primitive
//     ? T[P] // primitive → required
//     : T[P] extends (infer U)[]
//       ? RecursiveOptional<U>[] | null | undefined // arrays → optional
//       : RecursiveOptional<T[P]> extends object
//         ? RecursiveOptional<T[P]> | null // objects → optional
//         : never;
// } & { [P in keyof T as T[P] extends Primitive ? never : P]?: RecursiveOptional<T[P]> };

// export type RecursiveOptional<T> = {
//   [P in keyof T]: T[P] extends Primitive ? T[P] : RecursiveOptional<T[P]> | undefined;
// };

//
//
// export type RecursiveOptional11<T>= {
//   [P in keyof T]?:
//   T[P] extends Primitive
//     ? T[P]
//     : RecursiveOptional<T[P]>;
// }:
//
// export type RecursiveOptional22<T> = {
//   [K in keyof T]?: T[K] extends object
//     ? RecursiveOptional<T[K]>
//     : T[K];
// };
//
//
// export type RecursiveOptional4old<T> = {
//   [K in keyof T]: T[K] extends Primitive
//     ? T[K] // primitives stay required
//     : T[K] extends (infer U)[] // arrays
//       ? RecursiveOptional4old<U>[] // recurse inside array items
//       : RecursiveOptional4old<T[K]> | undefined; // objects become optional
// };

// export type RecursiveOptional<T> = {
//   [K in keyof T]: T[K] extends Primitive
//     ? T[K] // keep primitives required
//     : T[K] extends (infer U)[]
//       ? RecursiveOptional<U>[] // recurse into array items
//       : RecursiveOptional<T[K]>; // recurse into objects
// } extends infer O
//   ? { [K in keyof O]?: O[K] } // make object keys optional
//   : never;

// export type RecursiveOptional<T> = {
//   [K in keyof T]:
//   T[K] extends Primitive
//     ? T[K] // ✅ primitives stay required
//     : T[K] extends (infer U)[]
//       ? RecursiveOptional<U>[] | undefined // array optional
//       : RecursiveOptional<T[K]> | undefined; // object optional
// };

export type RecursiveOptional<T> = {
  // primitives → keep required
  [K in keyof T as T[K] extends Primitive ? K : never]: T[K];

  // objects/arrays → make optional
} & {
  [K in keyof T as T[K] extends Primitive ? never : K]?: T[K] extends (infer U)[]
    ? RecursiveOptional<U>[] // array of recursive optionals
    : RecursiveOptional<T[K]>; // recurse into object
};

export type UserFullType = RecursiveOptional<
  Prisma.UserGetPayload<{
    include: {
      ownedHalls: true;
      createdInvites: true;
      hall: true;
    };
  }>
>;

export type HallFullType = RecursiveOptional<
  Prisma.HallGetPayload<{
    include: {
      owner: true;
      employees: true;
      invitations: true;
    };
  }>
>;

export type InvitationFullType = RecursiveOptional<
  Prisma.InvitationGetPayload<{
    include: {
      hall: {
        include: {
          owner: true;
          employees: true;
        };
      };
      creator: {
        include: {
          ownedHalls: true;
          createdInvites: true;
          hall: true;
        };
      };
      messages: {
        include: {
          recipients: true;
        };
      };
      recipients: {
        include: {
          invitationMessage: true;
        };
      };
    };
  }>
>;

export type InvitationMessageFullType = RecursiveOptional<
  Prisma.InvitationMessageGetPayload<{
    include: {
      invitation: true;
      recipients: true;
    };
  }>
>;

export type InvitationRecipientFullType = RecursiveOptional<
  Prisma.InvitationRecipientGetPayload<{
    include: {
      invitation: true;
      invitationMessage: true;
    };
  }>
>;
