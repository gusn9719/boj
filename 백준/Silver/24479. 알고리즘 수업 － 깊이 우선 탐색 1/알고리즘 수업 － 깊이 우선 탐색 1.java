import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Main {
    // 1) static 필드 선언
    static List<Integer>[] graph;
    static boolean[] visited;
    static int[] order;
    static int cnt = 0;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        int R = Integer.parseInt(st.nextToken());

        // 그래프 배열과 방문 배열, 순서 배열 초기화
        graph = new ArrayList[N + 1];
        for (int i = 1; i <= N; i++) {
            graph[i] = new ArrayList<>();
        }
        visited = new boolean[N + 1];
        order = new int[N + 1];

        // 간선 정보 읽어서 인접 리스트 채우기
        for (int i = 0; i < M; i++) {
            st = new StringTokenizer(br.readLine());
            int a = Integer.parseInt(st.nextToken());
            int b = Integer.parseInt(st.nextToken());
            graph[a].add(b);
            graph[b].add(a);
        }
        // 인접 정점 작은 번호부터 방문하려면 정렬
        for (int i = 1; i <= N; i++) {
            Collections.sort(graph[i]);
        }

        // 2) static dfs 호출
        dfs(R);

        // 결과 출력
        StringBuilder sb = new StringBuilder();
        for (int i = 1; i <= N; i++) {
            sb.append(order[i]).append('\n');
        }
        System.out.print(sb);
    }

    // 3) dfs도 static 메서드로 선언
    static void dfs(int v) {
        visited[v] = true;
        order[v] = ++cnt;
        for (int nxt : graph[v]) {
            if (!visited[nxt]) {
                dfs(nxt);
            }
        }
    }
}
