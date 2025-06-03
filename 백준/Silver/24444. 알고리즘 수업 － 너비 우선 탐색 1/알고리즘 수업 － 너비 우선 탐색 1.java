import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        // 1) 입력 파싱
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken()); // 정점 개수
        int M = Integer.parseInt(st.nextToken()); // 간선 개수
        int R = Integer.parseInt(st.nextToken()); // BFS 시작 정점

        // 2) 인접 리스트 초기화 (크기 N+1)
        List<Integer>[] graph = new ArrayList[N + 1];
        for (int i = 1; i <= N; i++) {
            graph[i] = new ArrayList<>();
        }

        // 3) 간선 입력받아 인접 리스트에 추가
        for (int i = 0; i < M; i++) {
            st = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());
            graph[a].add(b);
            graph[b].add(a);
        }

        // 4) 작은 번호부터 방문하기 위해 각 그래프 리스트 오름차순 정렬
        for (int i = 1; i <= N; i++) {
            Collections.sort(graph[i]);
        }

        // 5) BFS 준비: visited, order, queue, cnt
        boolean[] visited = new boolean[N + 1];
        int[] order = new int[N + 1];
        int cnt = 0;

        Queue<Integer> queue = new ArrayDeque<>();
        // 5-1) 시작점 R 방문 표시
        visited[R] = true;
        order[R] = ++cnt;   // R을 1번째 방문
        queue.offer(R);

        // 6) BFS 반복
        while (!queue.isEmpty()) {
            int u = queue.poll();
            // u의 모든 인접 정점 nxt를 작은 번호 순으로 확인
            for (int nxt : graph[u]) {
                if (!visited[nxt]) {
                    visited[nxt] = true;
                    order[nxt] = ++cnt;
                    queue.offer(nxt);
                }
            }
        }

        // 7) 출력: 1번부터 N번까지 order 배열 값 한 줄씩
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= N; i++) {
            sb.append(order[i]).append('\n');
        }
        System.out.print(sb);
    }
}
