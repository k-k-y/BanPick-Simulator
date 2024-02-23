## Conventions

- 모든 작업내용은 Issue로 작성한 뒤, Fork된 Repository에서 Branch를 분리하여 작업하고, PR을 통해 상호간 Code-Review 이후 마지막에 Approve한 Reviewer가 Master Branch에 Merge 합니다.
- 이 때, Issue와 PR은 Fork 이전의 원본 Repository에서 작성하여 Project에 연동될 수 있도록 하며, Branch의 경우는 자신이 Fork한 Repository 내에서 분기하여 작업합니다.

---

### Commit Rule
```
__Action__ __FileName__ : __Description__
```
- Action 은 다음과 같이 세가지 종류로 구분됩니다.
    - Added : 새로운 파일을 추가한 경우
    - Update : 특정 파일을 수정한 경우
    - Remove : 특정 파일을 삭제한 경우
- FileName 은 추가 혹은 수정한 파일의 이름을 의미합니다.
    - Gradle, Gitignore과 같이 프로젝트 전역의 설정 파일을 수정하거나 패키지 혹은 라이브러리를 추가한 경우에는 ```Update Project```와 같이 작성합니다.
- Description 은 Commit에서 변경된 내용을 한 문장으로 요약합니다.

#### Commit Example
```
Added README.md
```
```
Update MainActivity : Added Login Button on Base Component
```
```
Update Project : Set Gradle Version to 7.3.1
```

---

### Issue / PR Rule

#### Title
```
[TYPE] TITLE
```
- TYPE 은 다음 중 하나를 선택합니다.
    - DEV : 일반적인 개발 사항
    - FIX : 기존에 개발된 내용을 수정하는 사항
    - DOC : README 등 문서에 관련된 사항

####  Content
```markdown
## Summary
Summary of Issue or PR

## Description
Detail Description of Issue or PR
```
- Description 항목이 불필요한 경우에는 생략할 수 있습니다. 단, PR의 경우에는 생략 없이 최대한 상세히 적어주시기 바랍니다.
- FIX Issue 혹은 UI에 관련된 PR의 경우는, Description에 스크린샷을 첨부해주시기 바랍니다.
- Issue 작성 시, Assignee와 Label을 지정하고, 생성한 Branch를 Development 항목에 지정해줍니다.
- PR 작성 시, Assignee와 Label을 지정하고, Reviewer에 해당하는 인원을 지정하며, 해당하는 Issue를 Development 항목에 지정해줍니다.

[Issue Example 1](https://github.com/yymin1022/Wa_API/issues/59) /
[Issue Example 2](https://github.com/yymin1022/TaxiMeter/issues/1)

[PR Example 1](https://github.com/DefCon-Apps/Military_License/pull/21) /
[PR Example 2](https://github.com/DefCon-Apps/Military_License/pull/22) /
[PR Example 3](https://github.com/DefCon-Apps/Military_License/pull/24)

---

### Branch Rule
```
TYPE/BRANCH_NAME
```
- 기본적으로 Branch의 이름은 Issue의 이름을 따릅니다.
- TYPE은 다음 중 하나를 해당하는 Issue의 Type과 동일하게 선택합니다.
    - DEV : 일반적인 개발 사항
    - FIX : 기존에 개발된 내용을 수정하는 사항
    - DOC : README 등 문서에 관련된 사항
- BRANCH_NAME은 해당하는 Issue의 Title을 적절히 변형합니다.

#### Branch Example
```
DEV/base-activity
```
```
DOC/readme-base
```