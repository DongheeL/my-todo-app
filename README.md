# My Todo App

간단한 할 일 관리 앱입니다.  
Next.js 기반으로 만들었고, Google 계정으로 로그인해서 개인화된 To-do 목록을 관리할 수 있습니다.

## 주요 기능

- ✅ 할 일 추가 / 삭제 / 완료 처리
- 🔐 Google 소셜 로그인
- 📱 모바일 대응 (반응형 UI)
- ⚡ 빠른 렌더링과 부드러운 사용자 경험

## 사용 기술

- **Frontend**: Next.js 14, React, TypeScript, TailwindCSS  
- **Backend**: Next.js API Routes, Prisma  
- **인증**: NextAuth.js (Google OAuth)  
- **DB**: Prisma + Neon (PostgreSQL)

## 프로젝트 특징

- **서버/클라이언트 컴포넌트 분리**  
  서버 컴포넌트로 SEO 처리 및 초기 렌더링, 클라이언트 컴포넌트는 동적인 기능만 담당합니다.

- **NextAuth 미들웨어 활용**  
  로그인 여부에 따라 라우팅을 제어합니다.

- **간결한 UI & 빠른 인터랙션**  
  최소한의 구성으로 할 일을 빠르게 관리할 수 있게 했습니다.

## 배포

Vercel로 배포했습니다.  
👉 [https://my-todo-app-gkcx.vercel.app](https://my-todo-app-gkcx.vercel.app)

### Vercel 환경 변수 설정

아래 환경 변수를 프로젝트 설정에 추가해야 합니다:

   - `NEXTAUTH_SECRET`: 인증에 사용되는 비밀 키 (안전한 랜덤 문자열)
   - `NEXTAUTH_URL`: 배포 URL (예: `https://my-todo-app-gkcx.vercel.app`)
   - `DATABASE_URL`: 데이터베이스 연결 문자열
   - `GOOGLE_CLIENT_ID`: Google OAuth 클라이언트 ID
   - `GOOGLE_CLIENT_SECRET`: Google OAuth 클라이언트 시크릿
   - Google Cloud Console에서 리디렉션 URI 추가:
     `https://my-todo-app-gkcx.vercel.app/api/auth/callback/google`

## 프로젝트 구조

```
my-todo-app/
├── prisma/                # Prisma 스키마 및 마이그레이션
├── public/                # 정적 파일
├── src/
│   ├── app/
│   │   ├── api/          # API 라우트
│   │   ├── components/   # 재사용 가능한 컴포넌트
│   │   ├── hooks/        # 커스텀 React 훅
│   │   ├── login/        # 로그인 페이지
│   │   ├── services/     # 서비스 레이어
│   │   ├── todos/        # 할 일 페이지
│   │   ├── types/        # TypeScript 타입 정의
│   │   ├── layout.tsx    # 루트 레이아웃
│   │   └── page.tsx      # 홈페이지
│   └── generated/        # 자동 생성된 코드
├── middleware.ts         # Next.js 미들웨어
├── next.config.ts        # Next.js 설정
└── README.md
```

## 인증 설정

이 프로젝트는 소셜 OAuth를 통한 인증을 사용합니다.

### Google OAuth 설정 방법

1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성
3. OAuth 동의 화면 구성
4. OAuth 클라이언트 ID 생성 (웹 애플리케이션 유형)
5. 승인된 리디렉션 URI 추가: `http://localhost:3000/api/auth/callback/google`
6. 클라이언트 ID와 비밀키를 환경 변수에 설정

## 데이터베이스 설정

Prisma를 사용하여 데이터베이스 모델을 정의하고 마이그레이션을 관리합니다.

```
// prisma/schema.prisma
model User {
  id            Int      @id @default(autoincrement())
  email         String   @unique
  name          String?
  image         String?
  provider      String?  // 'google', 'kakao' 등 로그인 제공자
  providerAccountId String?
  todos         Todo[]
}

model Todo {
  id        Int      @id @default(autoincrement())
  title     String
  completed Boolean  @default(false)
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
}
```

## 인증 관련 처리

- 로그인 시 로딩 UI로 사용자 흐름 방해 최소화
- 로그아웃 시 즉시 화면 전환 + 세션 정리
- 인증 미들웨어로 로그인 여부 체크 후 페이지 접근 제어
- 인증 여부에 따라 UI 조건부 렌더링




