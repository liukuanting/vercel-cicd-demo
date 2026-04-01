import { createSessionAction } from "@/app/actions";

export function CreateSessionForm() {
  return (
    <div className="form-card">
      <div className="preview-ribbon">HOST A SESSION</div>
      <h2>{"\u767c\u8d77\u65b0\u7684\u7fbd\u7403\u6642\u6bb5"}</h2>
      <p className="muted">
        {
          "\u8acb\u586b\u5beb\u65e5\u671f\u3001\u6642\u9593\u3001\u4eba\u6578\u9580\u6abb\u3001\u7a0b\u5ea6\u3001\u8cbb\u7528\u8207\u7403\u7a2e\uff0c\u5efa\u7acb\u5f8c\u5176\u4ed6\u6703\u54e1\u5c31\u80fd\u9810\u7d04\u3002"
        }
      </p>

      <form action={createSessionAction} className="form-grid" style={{ marginTop: 20 }}>
        <div className="field">
          <label htmlFor="title">{"\u5834\u6b21\u6a19\u984c"}</label>
          <input
            id="title"
            name="title"
            placeholder="\u4f8b\u5982\uff1a\u9031\u4e94\u665a\u9593\u96d9\u6253\u5718"
            required
          />
        </div>

        <div className="field">
          <label htmlFor="location">{"\u5834\u9928\u5730\u9ede"}</label>
          <input
            id="location"
            name="location"
            placeholder="\u4f8b\u5982\uff1a\u53f0\u5317\u5e02\u6c11\u7fbd\u7403\u9928 3 \u865f\u5834"
            required
          />
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="session_date">{"\u65e5\u671f"}</label>
            <input id="session_date" name="session_date" type="date" required />
          </div>
          <div className="field">
            <label htmlFor="skill_level">{"\u5be6\u529b\u7a0b\u5ea6"}</label>
            <select id="skill_level" name="skill_level" defaultValue="intermediate">
              <option value="beginner">{"\u521d\u968e"}</option>
              <option value="intermediate">{"\u4e2d\u968e"}</option>
              <option value="advanced">{"\u9032\u968e"}</option>
              <option value="competitive">{"\u7af6\u6280"}</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="start_time">{"\u958b\u59cb\u6642\u9593"}</label>
            <input id="start_time" name="start_time" type="time" required />
          </div>
          <div className="field">
            <label htmlFor="end_time">{"\u7d50\u675f\u6642\u9593"}</label>
            <input id="end_time" name="end_time" type="time" required />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="min_players">{"\u6700\u5c11\u4eba\u6578"}</label>
            <input
              id="min_players"
              name="min_players"
              type="number"
              min="2"
              defaultValue="4"
              required
            />
          </div>
          <div className="field">
            <label htmlFor="max_players">{"\u6700\u591a\u4eba\u6578"}</label>
            <input
              id="max_players"
              name="max_players"
              type="number"
              min="2"
              defaultValue="8"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label htmlFor="fee">{"\u8cbb\u7528"}</label>
            <input id="fee" name="fee" type="number" min="0" defaultValue="250" required />
          </div>
          <div className="field">
            <label htmlFor="shuttlecock">{"\u63d0\u4f9b\u7fbd\u7403"}</label>
            <input
              id="shuttlecock"
              name="shuttlecock"
              placeholder="YY AS-30 / match shuttle"
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="notes">{"\u88dc\u5145\u8aaa\u660e"}</label>
          <textarea
            id="notes"
            name="notes"
            placeholder="\u4f8b\u5982\uff1a\u53ef\u96f6\u6253\u3001\u96d9\u6253\u512a\u5148\u3001\u9700\u81ea\u5099\u98f2\u6c34\u3002"
          />
        </div>

        <button type="submit" className="primary-btn">
          {"\u5efa\u7acb\u5834\u6b21"}
        </button>
      </form>
    </div>
  );
}
