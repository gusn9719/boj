import java.io.*;
import java.util.*;

public class Main {
    static class Member {
        int age;
        String name;
        int order;
        Member(int age, String name, int order) {
            this.age = age;
            this.name = name;
            this.order = order;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        Member[] members = new Member[N];

        for (int i = 0; i < N; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            members[i] = new Member(
                Integer.parseInt(st.nextToken()),
                st.nextToken(),
                i
            );
        }

        Arrays.sort(members, new Comparator<Member>() {
            @Override
            public int compare(Member a, Member b) {
                if (a.age != b.age) {
                    return a.age - b.age;
                }
                return a.order - b.order;
            }
        });

        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        for (Member m : members) {
            bw.write(m.age + " " + m.name);
            bw.newLine();
        }
        bw.flush();
    }
}
